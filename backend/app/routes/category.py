from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from app.models import Category

bp = Blueprint("category", __name__)


@bp.route("/categories", methods=["GET"])
@jwt_required()
def get_categories():
    categories = Category.query.all()
    return jsonify([{"id": c.id, "name": c.name} for c in categories]), 200


@bp.route("/categories", methods=["POST"])
@jwt_required()
def create_category():
    try:
        data = request.get_json()
        category = Category(name=data["name"])
        db.session.add(category)
        db.session.commit()
        return (
            jsonify({"id": category.id, "message": "Category created successfully"}),
            201,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
