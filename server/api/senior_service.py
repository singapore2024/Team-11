from flask import Response, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, DESCENDING
from dotenv import dotenv_values
from bson import json_util, ObjectId
from config import app, db
from api.date_service import *
import json

config = dotenv_values(".env")

user_collection = db['users']
senior_collection = db['farms']
counter_collection = db['counters']

def get_all_seniors():
    seniors = list(senior_collection.find())
    return Response(json.dumps(seniors, default=str), mimetype="application/json")

def get_senior():
    senior_id = int(request.args.get('id'))
    senior = list(senior_collection.find({"senior_id": senior_id}))
    if senior is None:
        print("Senior not found!")
        return jsonify({"error": "Senior not found"}), 404
    return Response(json.dumps(senior[0], default=json_util.default), mimetype="application/json")

def create_new_senior():
    data = request.json
    
    if not data:
        return Response(json.dumps({"error": "No data"}), mimetype='application/json', status=400)
    
    try:
        senior_id = counter_collection.find_one_and_update(
            {"id": "senior_count"},
            {"$inc": {"count": 1}},
            return_document=True,
            upsert=True
        )["count"]
        new_senior = {**data, "senior_id": senior_id}
        senior_collection.insert_one(new_senior)
        new_senior["_id"] = str(new_senior["_id"])
    except Exception as e:
        return Response(json.dumps({"message": str(e)}), mimetype="application/json", status=500)

    return jsonify({"message": "Senior created!", "new_senior": new_senior}), 201

def update_senior():
    data = request.json
    senior_id = data.get('senior_id')
    if not data:
        return jsonify({"error": "Data needed for PATCH senior"}), 400
    senior_id = int(senior_id)
    try:
        result = senior_collection.update_one(
            {"senior_id": senior_id},
            {"$set": data}
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"message": f"Senior {senior_id} updated: {data}"}), 201

def days_last_visited():
    senior_id = int(request.args.get('id'))

    latest_completed_visit = list(visit_collection.find({"senior_id": senior_id, "status": "Completed"}))
    
    if not latest_completed_visit:
        return jsonify({ "days": "NEVER VISITED" }), 201
    latest_completed_visit.sort(key=lambda x: datetime.strptime(x['date'], '%d %b %Y'), reverse=True)
    visit_data = json.loads(json.dumps(latest_completed_visit[0], default=json_util.default))
    days = days_difference(visit_data['date'])

    return jsonify({ "days": 5 }), 201

