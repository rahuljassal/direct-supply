from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import Config
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS


db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Register blueprints
    from app.routes import auth_bp, product_bp, category_bp

    @app.route("/", methods=["get"])
    def home():
        return "Backend is up"

    app.register_blueprint(auth_bp, url_prefix="/api/v1")
    app.register_blueprint(product_bp, url_prefix="/api/v1")
    app.register_blueprint(category_bp, url_prefix="/api/v1")

    # Create CLI commands
    @app.cli.command("init-db")
    def init_db():
        """Initialize the database."""
        db.create_all()
        print("Database initialized!")

    from app.models import User, UserRole, Category

    @app.cli.command("create-admin")
    def create_admin():
        """Create an admin user."""
        admin = User(
            name="admin",
            email="admin@example.com",
            password_hash=generate_password_hash("admin123"),
            role=UserRole.ADMIN.value,
            is_verified=True,
        )
        db.session.add(admin)
        db.session.commit()
        print("Admin user created!")

    @app.cli.command("create-categories")
    def create_categories():
        """Create categories"""
        category_arr = [
            "Outdoor & Sports",
            "Electronics",
            "Apparel",
            "Home Automation",
            "Transportation",
            "Wearables",
        ]
        for category in category_arr:
            category = Category(
                name=category,
            )
            db.session.add(category)
            db.session.commit()
        print("Categories are created !!!")

    return app
