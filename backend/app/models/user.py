from app import db
from datetime import datetime
import enum


class UserRole(enum.Enum):
    ADMIN = "admin"
    BUYER = "buyer"
    SUPPLIER = "supplier"
    SALES = "sales"


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_role(self, role: UserRole):
        self.role = role.value

    def get_role(self) -> UserRole:
        return UserRole(self.role)
