import MySQLdb
import sqlalchemy

from typing import Optional
from fastapi import FastAPI
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import create_engine
from fastapi.encoders import jsonable_encoder

DATABASE_URL="mysql+mysqldb://root:@localhost/carbon_footprint?charset=utf8mb4"

metadata = sqlalchemy.MetaData()

engine = sqlalchemy.create_engine(
    DATABASE_URL
)
metadata.create_all(engine)

electricity = sqlalchemy.Table(
    "electricity",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("date", sqlalchemy.Date),
    sqlalchemy.Column("kwh", sqlalchemy.Integer),
    sqlalchemy.Column("low", sqlalchemy.Integer),
    sqlalchemy.Column("high", sqlalchemy.Integer),
)

natural_gas = sqlalchemy.Table(
    "natural_gas",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("month", sqlalchemy.String),
    sqlalchemy.Column("therms", sqlalchemy.Integer),
    sqlalchemy.Column("average_temperature", sqlalchemy.Integer),
)

travel = sqlalchemy.Table(
    "travel",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("type", sqlalchemy.String),
    sqlalchemy.Column("date", sqlalchemy.Date),
    sqlalchemy.Column("location", sqlalchemy.String),
    sqlalchemy.Column("time", sqlalchemy.String),
    sqlalchemy.Column("miles", sqlalchemy.Integer),
)

water = sqlalchemy.Table(
    "water",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("cons", sqlalchemy.Integer),
    sqlalchemy.Column("date_paid", sqlalchemy.Date),
    sqlalchemy.Column("total", sqlalchemy.Float),
)


metadata.create_all(engine)

class Electricity(BaseModel):
    id: int
    date: str
    kwh: int
    low: int
    high: int


class NaturalGas(BaseModel):
    id: int
    month: str
    therms: int
    average_temperature: int

class Travel(BaseModel):
    id: int
    type: str
    date: str
    location: str
    time: Optional[str] = None
    miles: int

class Water(BaseModel):
    id: int
    cons: int
    date_paid: str
    total: float

app = FastAPI()

@app.on_event("startup")
def startup():
    engine.connect()

@app.on_event("shutdown")
def shutdown():
    engine.disconnect()

# routes
    
API_ROOT = "/api/v1"

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get(API_ROOT + "/electricity/", response_model=List[Electricity])
def read_electricity():
    query = electricity.select()
    with engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_body.append(jsonable_encoder(row))
        return json_body
    
@app.get(API_ROOT + "/natural-gas/", response_model=List[NaturalGas])
def read_natural_gas():
    query = natural_gas.select()
    with engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_body.append(jsonable_encoder(row))
        return json_body
    
@app.get(API_ROOT + "/travel/", response_model=List[Travel])
def read_travel():
    query = travel.select()
    with engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_body.append(jsonable_encoder(row))
        return json_body
    
@app.get(API_ROOT + "/water/", response_model=List[Water])
def read_water():
    query = water.select()
    with engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_body.append(jsonable_encoder(row))
        return json_body