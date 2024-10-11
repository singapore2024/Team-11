from flask import Response, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from pymongo import MongoClient
from dotenv import dotenv_values
from bson import json_util, ObjectId
from config import app, db, bcrypt
from datetime import datetime
import pytz
import json

config = dotenv_values(".env")

user_collection = db['users']
senior_collection = db['seniors']
visit_collection = db['visits']
counter_collection = db['counters']

timezone = pytz.timezone('Asia/Singapore')

today = datetime.now(timezone).date()

def days_difference(date):
    date = datetime.strptime(date, "%d %b %Y").date()
    days_difference = (today - date).days
    return days_difference