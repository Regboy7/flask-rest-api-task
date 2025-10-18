from flask import Flask
from vehicle_api import vehicle_api #importing the blueprint from the routes file

app = Flask(__name__) # initialisation of the flask app

app.register_blueprint(vehicle_api, url_prefix='/api') # registering the blueprint

@app.route('/')
def home():
    return "Welcome to vehicle api! use api/vehicles to use the vehicle data"

if __name__ == '__main__': # running the app.
    app.run(debug=True)