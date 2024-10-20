from flask import Blueprint
from app.models.controllers.auth_controller import register_user, login_user

auth_bp = Blueprint('auth', __name__)

# Define routes
auth_bp.route('/register', methods=['POST'])(register_user)
auth_bp.route('/login', methods=['POST'])(login_user)
