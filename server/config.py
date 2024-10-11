from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import dotenv_values, load_dotenv
import os

app = Flask(__name__)
load_dotenv()

app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

bcrypt = Bcrypt(app)
CORS(app)
jwt = JWTManager(app)


client = MongoClient(os.getenv('ATLAS_URI'))
db = client[os.getenv('DB_NAME')]