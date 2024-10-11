from flask import Response, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import dotenv_values
from bson import json_util, ObjectId
from config import app, db, bcrypt
from api.user_service import *
from api.senior_service import *
from api.visit_service import *
import json

config = dotenv_values(".env")

user_collection = db['users']
senior_collection = db['farms']
counter_collection = db['counters']

@app.route("/register", methods=["POST"])
def register():
    return register_user()

@app.route('/login', methods=['POST'])
def login():
    return login_user()

@app.route('/email', methods=['GET'])
def email():
    return check_email()

@app.route('/mobile', methods=['GET'])
def mobile():
    return check_mobile()

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Logged out successfully'})

@app.route("/users", methods=["GET"])
def users():
    return get_all_users()

@app.route("/user", methods=["GET"])
def user():
    return get_user()

@app.route("/seniors", methods=["GET"])
def seniors():
    return get_all_seniors()

@app.route("/senior", methods=["GET"])
def senior():
    return get_senior()

@app.route("/create_senior", methods=["POST"])
def create_senior():
    return create_new_senior()

@app.route("/update_senior", methods=["PATCH"])
def update_senior_function():
    return update_senior()

@app.route("/visits", methods=["GET"])
def visits():
    return get_all_visits()

@app.route("/visit", methods=["GET"])
def visit():
    return get_visit()

@app.route("/user_visits", methods=["GET"])
def user_visits():
    return get_user_visits()

@app.route("/visit_id", methods=["GET"])
def visit_id():
    return latest_visit_id()

@app.route("/create_visit", methods=["POST"])
def create_visit():
    return create_new_visit()

@app.route("/update_visit", methods=["PATCH"])
def update_visit_function():
    return update_visit()
    
@app.route("/days", methods=["GET"])
def days():
    return days_last_visited()

@app.route("/join_farm", methods=["POST"])
def join_farms():
    return join_farm()

@app.route("/farm_details", methods=["GET"])
def farm_details():
    return get_farm_details()


if __name__ == "__main__":
    app.run(debug=True, port=5000)