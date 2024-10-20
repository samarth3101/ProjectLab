from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

# Initialize Flask extensions
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    print("Initializing the app...")
    app = Flask(__name__)  # Use __name__ instead of _name_
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # Register routes
    from app.routes.auth import auth_bp
    from app.routes.progress import progress_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(progress_bp)

    return app
