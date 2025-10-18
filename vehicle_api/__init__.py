from flask import Blueprint


vehicle_api = Blueprint('vehicle_api', __name__)

from . import vehicle_routes

