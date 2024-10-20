from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.controllers.progress_controller import update_progress, get_progress

progress_bp = Blueprint('progress', __name__)

# Define routes
@progress_bp.route('/progress/update', methods=['POST'])  # Corrected the route definition
@jwt_required()  # Ensure JWT is required for this route
def update_progress_route():
    return update_progress()

@progress_bp.route('/progress/<int:course_id>', methods=['GET'])  # Corrected the route definition
@jwt_required()  # Ensure JWT is required for this route
def get_progress_route(course_id):
    return get_progress(course_id)
