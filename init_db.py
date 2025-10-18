import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'vehicles.db') # ensuring the database file is created in the same directory as this script.
connection = sqlite3.connect(db_path)       # creating a connection to the database.
cursor = connection.cursor()    # creating a cursor object to fufil sql commands.
cursor.execute('''
CREATE TABLE IF NOT EXISTS vehicles(
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               registration TEXT NOT NULL,
               make TEXT NOT NULL,
               model TEXT NOT NULL,
               year INTEGER NOT NULL
               )''')    # create a table if there isn't one already to store vehicle data.
cursor.executemany('''
INSERT INTO vehicles (registration, make, model, year)
values (?, ?, ?, ?)
''',[
                       ('PF04COH', 'Ford', 'Fusion', 2004),
                       ('PJ72 BNK', 'Vauxhall', 'Corsa', 2012),
                       ('HG12 PFT', 'Toyota', 'Yaris', 2012),
                       ('SK01 SKE', 'TOYOTA', 'Carina', 2001),
])      # inserting some mock vehicle data into the database using a function that executes multiple at once.

connection.commit()     # committing (saving) the changes to the database.
#cursor.execute('SELECT * FROM vehicles ORDER BY YEAR DESC') # testing the database.
connection.close()      # closing the connection

