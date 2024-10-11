from flask import Response, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import dotenv_values
from bson import json_util, ObjectId
from config import app, db, jwt
import json

config = dotenv_values(".env")

user_collection = db['users']
senior_collection = db['seniors']
visit_collection = db['visits']
counter_collection = db['counters']


def get_all_visits():
    visits = list(visit_collection.find())
    return Response(json.dumps(visits, default=str), mimetype="application/json")

def get_visit():
    visit_id = int(request.args.get('id'))
    visit = list(visit_collection.find({"visit_id": visit_id}))
    if visit is None:
        print("Visit not found!")
        return jsonify({"error": "Visit not found"}), 404
    return Response(json.dumps(visit[0], default=str), mimetype="application/json")

def get_user_visits():
    user_id = int(request.args.get('id'))
    visits = list(visit_collection.find({"visitor_ids": {"$elemMatch": {"$eq": user_id}}}))
    if visits is None:
        print("User visits not found!")
        return jsonify({"error": "user visits not found"}), 404
    return Response(json.dumps(visits, default=str), mimetype="application/json")

def latest_visit_id():
    latest_visit_id = counter_collection.find_one({"id": "visit_count"})["count"]
    return Response(json.dumps(latest_visit_id), mimetype="application/json")

def create_new_visit():
    data = request.json 
    if not data:
        return jsonify({"error": "Data needed to CREATE visit"}), 400

    try:
        visit_id = counter_collection.find_one_and_update(
            {"id": "visit_count"},
            {"$inc": {"count": 1}},
            return_document=True,
            upsert=True
        )["count"]
        new_visit = {**data, "visit_id": visit_id}
        visit_collection.insert_one(new_visit)
        new_visit["_id"] = str(new_visit["_id"])
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    return jsonify({"message": "Visit created!", "new_visit": new_visit}), 201

def update_visit():
    data = request.json
    visit_id = data.get('visit_id')
    if not data:
        return jsonify({"error": "Data needed for PATCH visit"}), 400
    visit_id = int(visit_id)
    try:
        result = visit_collection.update_one(
            {"visit_id": visit_id},
            {"$set": data}
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"message": f"Visit {visit_id} updated: {data}"}), 201