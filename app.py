from flask import Flask, render_template
from vehicle_api import vehicle_api #importing the blueprint from the routes file

app = Flask(__name__) # initialisation of the flask app

app.register_blueprint(vehicle_api, url_prefix='/api')

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__': # running the app.
    app.run(debug=True)