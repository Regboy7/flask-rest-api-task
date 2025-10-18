from flask import request, jsonify #importing necessary modules from flask for handling routes.
import sqlite3 # database helper
import os # helps build file paths that work on any device
from . import vehicle_api # importing blueprint instance


def getdbconnection():   # function to get a connection to the database
    db_path = os.path.join(os.path.dirname(__file__), '..', 'vehicles.db') #ensuring the database is created in the same directory as init.db.py
    conectn = sqlite3.connect(db_path) #creating a connection to the database with the path
    conectn.row_factory = sqlite3.Row # allows dictionary-like access to rows (key-value pairs) making it easier to sort and filter data.
    return conectn # returning the connection object


@vehicle_api.route('/vehicles', methods=['GET']) # api endpoint to grab all vehicle data
def get_vehicles():
    conectn = getdbconnection() #get db connection
    cursor = conectn.cursor() #define cursor
    cursor.execute('SELECT * FROM vehicles') #sql query with cursor
    rows = cursor.fetchall() #get all rows from query

    vehicles = [dict(row) for row in rows]#convert rows into a list of dictionaries
    conectn.close() #close connection
    return jsonify(vehicles) #returning the data in json format

@vehicle_api.route('/vehicles', methods=['POST']) # endpoint to add new vehicle data
def add_vehicle():
    data = request.get_json() # getting the json data from the request body (in dictionary format)
    required_fields = ['registration', 'make', 'model', 'year']
    if not all (data in field for field in required_fields): # missing field validation
        return jsonify({"error": "1 or more fields are missing"}), 400
    
    try: 
        year = int(data['year']) # convert year to integer
        if year <1880 or year > 2026: # year range validation
            return jsonify({"error": "Year must be between 1880 and 2026"}), 400
    except ValueError: # correct year data type validation
        return jsonify({"error": "Year must be an integer"}), 400
    
    conectn = getdbconnection() # get db connection as above
    cursor = conectn.cursor()
    cursor.execute('''
    INSERT INTO vehicles (registration, make, model, year)
                   values (?, ?, ?, ?)
    ''', (data['registration'], data['make'], data['model'], data['year'])) # inserting new vehicle data
    conectn.commit()
    conectn.close()

    return jsonify({"message": "Vehicle added!"}), 201 #final success message