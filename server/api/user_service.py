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
senior_collection = db['farms']
counter_collection = db['counters']

def register_user():
    data = request.json
    # hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
    if not data:
        return Response(json.dumps({"error": "Request body error in create new user"}), mimetype='application/json', status=400)
    existing_user = user_collection.find_one({
        "$or": [
            {"email": data['email']}
        ]
    })
    
    if existing_user:
        return jsonify({"error": "User with this email already exists."}), 400

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
    print("getting users")
    users = list(user_collection.find())
    return Response(json.dumps(users, default=str), mimetype="application/json")

def get_user():
    user_id = int(request.args.get('id'))
    user = list(user_collection.find({"user_id": user_id}))
    if user is None:
        return jsonify({"error": "User not found"}), 404
    return Response(json.dumps(user[0], default=json_util.default), mimetype="application/json")

def join_farm():
    # Get the user_id and farm_id parameters from the request
    userID = request.args.get('user_id')
    farmID = request.args.get('farm_id')

    # Check if the user_id and farm_id are provided and are integers
    if not userID or not userID.isdigit():
        return jsonify({"error": "User id not input or invalid"}), 404
    
    if not farmID or not farmID.isdigit():
        return jsonify({"error": "Farm id not input or invalid"}), 404

    # Convert the ids to integers now that we've verified they're valid
    userID = int(userID)
    farmID = int(farmID)

    # Fetch the user's farms and the farm's medical info
    user_document = user_collection.find_one({"user_id": userID}, {"farms": 1, "_id": 0})
    if user_document is None:
        return jsonify({"error": "User not found"}), 404

    user_farms = user_document.get('farms', [])

    farm_document = senior_collection.find_one({"senior_id": farmID}, {"medical": 1, "_id": 0})
    if farm_document is None:
        return jsonify({"error": "Farm not found"}), 404

    farm_users = farm_document.get('medical', [])

    # Check if the user is already in the farm
    if farmID in user_farms:
        return jsonify({"error": "User is already in the farm!"}), 400

    # Add the user to the farm and the farm to the user's list
    farm_users.append(userID)
    user_farms.append(farmID)

    # Update the user's farms in the database
    user_collection.update_one(
        {"user_id": userID},   # Find the user by user_id
        {"$set": {"farms": user_farms}}  # Update the 'farms' field
    )

    # Update the farm's 'medical' field in the senior_collection
    senior_collection.update_one(
        {"senior_id": farmID},   # Find the farm by farm_id
        {"$set": {"medical": farm_users}}  # Update the 'medical' field
    )

    return jsonify({"message": "User has successfully joined the farm"}), 200
