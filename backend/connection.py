import MySQLdb
import sqlalchemy
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

metadata = sqlalchemy.MetaData()
engine = sqlalchemy.create_engine(
  DATABASE_URL
)
metadata.create_all(engine)
app = FastAPI()

origins = [
    "http://localhost:3001",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    engine.connect()

@app.on_event("shutdown")
def shutdown():
    engine.disconnect()

# routes
    
API_ROOT = "/api/v1"
