from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from app.models import User, UserRole

bp = Blueprint("auth", __name__)


@bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        if User.query.filter_by(email=data["email"]).first():
            return jsonify({"error": "Email already registered"}), 400

        user = User(
            email=data["email"],
            password_hash=generate_password_hash(data["password"]),
            role=UserRole(data["role"]).value,
            name=data["name"],
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        user = User.query.filter_by(email=data["email"]).first()

        if not user or not check_password_hash(user.password_hash, data["password"]):
            return (
                jsonify(
                    {"error": "User not found" if not user else "Invalid credentials"}
                ),
                401,
            )

        access_token = create_access_token(identity=user.id)
        return (
            jsonify(
                {
                    "access_token": access_token,
                    "role": user.role,
                    "name": user.name,
                    "email": user.email,
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@bp.route("/user-info", methods=["GET"])
@jwt_required()
def get_user_info():
    try:
        current_user_id = get_jwt_identity()

        user = User.query.get(current_user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        return (
            jsonify(
                {
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 400
