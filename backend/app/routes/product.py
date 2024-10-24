from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from app.models import Product
from app.services.demand_forecast import generate_demand_forecast
from app.services.price_optimization import optimize_product_price
from http import HTTPStatus
from datetime import datetime

bp = Blueprint("product", __name__)


# GET ALL products
@bp.route("/products", methods=["GET"])
@jwt_required()
def get_products():
    try:
        name = request.args.get("name")
        category_id = request.args.get("category_id")

        query = Product.query

        if name:
            query = query.filter(Product.name.ilike(f"%{name}%"))
        if category_id:
            query = query.filter_by(category_id=category_id)

        products = query.all()
        return (
            jsonify(
                [
                    {
                        "id": p.id,
                        "name": p.name,
                        "description": p.description,
                        "cost_price": p.cost_price,
                        "selling_price": p.selling_price,
                        "category_id": p.category_id,
                        "category_name": p.category.name,
                        "stock_available": p.stock_available,
                        "units_sold": p.units_sold,
                        "customer_rating": p.customer_rating,
                        "expected_demand": optimize_product_price(p)["expected_demand"],
                        "optimized_price": optimize_product_price(p)["optimized_price"],
                    }
                    for p in products
                ]
            ),
            200,
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# GET single product by ID
@bp.route("/products/<int:product_id>", methods=["GET"])
@jwt_required()
def get_product(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        return (
            jsonify(
                {
                    "id": product.id,
                    "name": product.name,
                    "description": product.description,
                    "cost_price": product.cost_price,
                    "selling_price": product.selling_price,
                    "category_id": product.category_id,
                    "stock_available": product.stock_available,
                    "units_sold": product.units_sold,
                    "customer_rating": product.customer_rating,
                    "created_at": product.created_at.isoformat(),
                    "updated_at": product.updated_at.isoformat(),
                }
            ),
            HTTPStatus.OK,
        )
    except Exception as e:
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


# POST create a product
@bp.route("/products", methods=["POST"])
@jwt_required()
def create_product():
    try:
        data = request.get_json()
        # Validate required fields
        required_fields = ["name", "cost_price", "selling_price", "category_id"]
        for field in required_fields:
            if field not in data:
                return (
                    jsonify({"error": f"Missing required field: {field}"}),
                    HTTPStatus.BAD_REQUEST,
                )

        new_product = Product(
            name=data["name"],
            description=data.get("description"),
            cost_price=data["cost_price"],
            selling_price=data["selling_price"],
            category_id=data["category_id"],
            stock_available=data.get("stock_available", 0),
            units_sold=data.get("units_sold", 0),
            customer_rating=data.get("customer_rating"),
            demand_forecast=data.get("demand_forecast"),
            optimized_price=data.get("optimized_price"),
        )

        db.session.add(new_product)
        db.session.commit()

        return (
            jsonify(
                {
                    "message": "Product created successfully",
                    "product_id": new_product.id,
                }
            ),
            HTTPStatus.CREATED,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


# POST add multiple products
@bp.route("/products/bulk-create", methods=["POST"])
@jwt_required()
def bulk_create_products():
    try:
        data = request.get_json()

        if not isinstance(data, list):
            return (
                jsonify({"error": "Request body must be an array of products"}),
                HTTPStatus.BAD_REQUEST,
            )

        created_products = []
        failed_creations = []

        # Create products
        for product_data in data:
            try:
                # Validate required fields
                required_fields = ["name", "cost_price", "selling_price"]
                missing_fields = [
                    field for field in required_fields if field not in product_data
                ]

                if missing_fields:
                    failed_creations.append(
                        {
                            "error": f"Missing required fields: {', '.join(missing_fields)}",
                            "data": product_data,
                        }
                    )
                    continue

                # Create new product with current timestamp
                product = Product(
                    name=product_data["name"],
                    description=product_data.get("description"),
                    cost_price=product_data["cost_price"],
                    selling_price=product_data["selling_price"],
                    category_id=product_data.get("category_id"),
                    stock_available=product_data.get("stock_available", 0),
                    units_sold=product_data.get("units_sold", 0),
                    customer_rating=product_data.get("customer_rating"),
                    demand_forecast=product_data.get("demand_forecast"),
                    optimized_price=product_data.get("optimized_price"),
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow(),
                )

                db.session.add(product)
                # Flush to get the product ID without committing
                db.session.flush()

                created_products.append({"id": product.id, "name": product.name})

            except Exception as e:
                failed_creations.append({"data": product_data, "error": str(e)})

        # Commit all successful creations if there are any
        if created_products:
            db.session.commit()
        else:
            db.session.rollback()
            return (
                jsonify(
                    {"error": "No products were created", "failures": failed_creations}
                ),
                HTTPStatus.BAD_REQUEST,
            )

        # Prepare response
        response = {
            "success": {"count": len(created_products), "products": created_products}
        }

        # Add failed creations to response if any
        if failed_creations:
            response["failures"] = {
                "count": len(failed_creations),
                "details": failed_creations,
            }

        status_code = (
            HTTPStatus.CREATED if not failed_creations else HTTPStatus.PARTIAL_CONTENT
        )

        return jsonify(response), status_code

    except Exception as e:
        db.session.rollback()
        return (
            jsonify({"error": "Bulk creation failed", "message": str(e)}),
            HTTPStatus.INTERNAL_SERVER_ERROR,
        )


# PUT update a product
@bp.route("/products/<int:product_id>", methods=["PUT"])
@jwt_required()
def update_product(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json()
        print(data)

        # Update fields if provided in request
        if "name" in data:
            product.name = data["name"]
        if "description" in data:
            product.description = data["description"]
        if "cost_price" in data:
            product.cost_price = data["cost_price"]
        if "selling_price" in data:
            product.selling_price = data["selling_price"]
        if "category_id" in data:
            product.category_id = data["category_id"]
        if "stock_available" in data:
            product.stock_available = data["stock_available"]
        if "units_sold" in data:
            product.units_sold = data["units_sold"]
        if "customer_rating" in data:
            product.customer_rating = data["customer_rating"]
        if "demand_forecast" in data:
            product.demand_forecast = data["demand_forecast"]
        if "optimized_price" in data:
            product.optimized_price = data["optimized_price"]

        product.updated_at = datetime.utcnow()
        db.session.commit()

        return (
            jsonify(
                {"message": "Product updated successfully", "product_id": product.id}
            ),
            HTTPStatus.OK,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


# PUT update mulitple product
@bp.route("/products/bulk-update", methods=["PUT"])
@jwt_required()
def bulk_update_products():
    try:
        data = request.get_json()

        if not isinstance(data, list):
            return (
                jsonify({"error": "Request body must be an array of products"}),
                HTTPStatus.BAD_REQUEST,
            )

        updated_products = []
        failed_updates = []

        for product_data in data:
            # Check if id is provided
            if "id" not in product_data:
                failed_updates.append({"error": "Missing id", "data": product_data})
                continue

            product = Product.query.get(product_data["id"])

            # If product doesn't exist, add to failed updates
            if not product:
                failed_updates.append(
                    {
                        "id": product_data["id"],
                        "error": "Product not found",
                    }
                )
                continue

            try:
                # Update fields if provided
                fields_to_update = [
                    "name",
                    "description",
                    "cost_price",
                    "selling_price",
                    "category_id",
                    "stock_available",
                    "units_sold",
                    "customer_rating",
                    "demand_forecast",
                    "optimized_price",
                ]

                for field in fields_to_update:
                    if field in product_data:
                        setattr(product, field, product_data[field])

                product.updated_at = datetime.utcnow()
                updated_products.append(product.id)

            except Exception as e:
                failed_updates.append({"id": product_data["id"], "error": str(e)})

        # Commit all successful updates
        if updated_products:
            db.session.commit()

        # Prepare response
        response = {
            "success": {"count": len(updated_products), "products": updated_products}
        }

        # Add failed updates to response if any
        if failed_updates:
            response["failures"] = {
                "count": len(failed_updates),
                "details": failed_updates,
            }

        status_code = (
            HTTPStatus.OK if not failed_updates else HTTPStatus.PARTIAL_CONTENT
        )

        return jsonify(response), status_code

    except Exception as e:
        db.session.rollback()
        return (
            jsonify({"error": "Bulk update failed", "message": str(e)}),
            HTTPStatus.INTERNAL_SERVER_ERROR,
        )


# DELETE product
@bp.route("/products/<int:product_id>", methods=["DELETE"])
@jwt_required()
def delete_product(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()

        return (
            jsonify(
                {"message": "Product deleted successfully", "product_id": product_id}
            ),
            HTTPStatus.OK,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


#  GET demand forecast for the selected products
@bp.route("/products/demand-forecast", methods=["GET"])
@jwt_required()
def get_demand_forecasts():
    try:
        product_ids_str = request.args.get("product_ids", "")

        if not product_ids_str:
            return (
                jsonify({"error": "product_ids parameter is required"}),
                HTTPStatus.BAD_REQUEST,
            )

        # Convert comma-separated string to list of integers
        try:
            product_ids = [int(pid.strip()) for pid in product_ids_str.split(",")]
        except ValueError:
            return (
                jsonify(
                    {
                        "error": "Invalid product IDs format. Expected comma-separated integers"
                    }
                ),
                HTTPStatus.BAD_REQUEST,
            )

        if not product_ids:
            return (
                jsonify({"error": "At least one product ID is required"}),
                HTTPStatus.BAD_REQUEST,
            )

        res = {}
        for product_id in product_ids:
            product = Product.query.get_or_404(product_id)
            forecast_data = generate_demand_forecast(product)
            res[product_id] = forecast_data

        return jsonify(res), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
