from flask import Response, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from pymongo import MongoClient
from dotenv import dotenv_values
from bson import json_util, ObjectId
from config import app, db, bcrypt
import json

config = dotenv_values(".env")

user_collection = db['users']
senior_collection = db['seniors']
visit_collection = db['visits']
counter_collection = db['counters']

def register_user():
    data = request.json
    # hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
    if not data:
        return Response(json.dumps({"error": "Request body error in create new user"}), mimetype='application/json', status=400)
    existing_user = user_collection.find_one({
        "$or": [
            {"nric": data['nric']},
            {"email": data['email']},
            {"mobile": data['mobile']}
        ]
    })
    
    if existing_user:
        return jsonify({"error": "User with this NRIC, email, or mobile number already exists."}), 400

    try:
        user_id = counter_collection.find_one_and_update(
            {"id": "user_count"},
            {"$inc": {"count": 1}},
            return_document=True,
            upsert=True
        )["count"]
  
        new_user = {**data, "user_id": user_id} #, "password": hashed_password}
        user_collection.insert_one(new_user)
        new_user["_id"] = str(new_user["_id"])
    except Exception as e:
        return Response(json.dumps({"message": str(e)}), mimetype="application/json", status=500)
    try:
        access_token = create_access_token(identity={"user_id": user_id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify({"message": "User registered successfully!", "access_token": access_token, "user": new_user}), 201

def login_user():
    data = request.json
    mobile = data['mobile']

    if not data or not mobile:
        return Response(json.dumps({"error": "Mobile number missing"}), mimetype='application/json', status=400)

    try:
        user = list(user_collection.find(
            {"mobile": str(mobile)}
        ))
        user_data = json.loads(json.dumps(user[0], default=json_util.default))
    except Exception as e:
        return jsonify({"User does not exist": str(e)}), 400
    try:
        if user:
            user_id = user_data['user_id']
        access_token = create_access_token(identity={"user_id": user_id})
    except Exception as e:
        return jsonify({"Error with access token": str(e)}), 500

    return jsonify({
            "message": "Login successfully!",
            "access_token": access_token,
            "user": user_data 
        }), 201

def check_email():
    email = str(request.args.get('email'))
    user = list(user_collection.find({"email": email}))
    if user is None:
        return jsonify({"error": "User not found"}), 404
    return Response(json.dumps(user[0], default=json_util.default), mimetype="application/json")

def check_mobile():
    mobile = str(request.args.get('mobile'))
    user = list(user_collection.find({"mobile": mobile}))
    if user is None:
        return jsonify({"error": "User not found"}), 404
    return Response(json.dumps(user[0], default=json_util.default), mimetype="application/json")

def get_all_users():
    users = list(user_collection.find())
    return Response(json.dumps(users, default=str), mimetype="application/json")

def get_user():
    user_id = int(request.args.get('id'))
    user = list(user_collection.find({"user_id": user_id}))
    if user is None:
        return jsonify({"error": "User not found"}), 404
    return Response(json.dumps(user[0], default=json_util.default), mimetype="application/json")