from flask import Flask, request, jsonify # import modules required for my flask app

app = Flask(__name__) # initialisation of the flask app

vehicles = [] # list where vehicle data will eventually be stored

@app.route('/vehicles', methods=['GET']) # api endpoint to grab all vehicle data
def get_vehicles():
    return jsonify(vehicles)

@app.route('/vehicles', methods=['POST']) # endpoint to add new vehicle data
def add_vehicle():
    data = request.get_json()
    vehicles.append(data)
    return jsonify({"message": "Vehicle added!"}), 201

if __name__ == '__main__': # running the app.
    app.run(debug=True)