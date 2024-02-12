import MySQLdb
import sqlalchemy

from typing import Optional
from fastapi import FastAPI
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import create_engine
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
import consts

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

ffp = sqlalchemy.Table(
    "fossil_fuel_percentage",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("year", sqlalchemy.Integer),
    sqlalchemy.Column("percentage", sqlalchemy.Integer),
)


metadata.create_all(engine)

class Electricity(BaseModel):
    id: int
    date: str
    kwh: int
    low: int
    high: int
    kgco2: float


class NaturalGas(BaseModel):
    id: int
    month: str
    therms: int
    average_temperature: int
    kgco2: float

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

class FFP(BaseModel):
    id: int
    year: int
    percentage: int

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
            year = int(row.date.strftime("%Y"))
            percentage = conn.execute(f"SELECT percentage FROM fossil_fuel_percentage where year = {year}").first()[0]
            json_row = {
                "id": row.id,
                "date": row.date.strftime("%Y-%m-%d"),
                "kwh": row.kwh,
                "low": row.low,
                "high": row.high,
                "kgco2": consts.KG_KWH(row.kwh, percentage)
            }
            json_body.append(json_row)
        return json_body
    
@app.get(API_ROOT + "/natural-gas/", response_model=List[NaturalGas])
def read_natural_gas():
    query = natural_gas.select()
    with engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_row = {
                "id": row.id,
                "month": row.month,
                "therms": row.therms,
                "average_temperature": row.average_temperature,
                "kgco2": consts.KG_THERM(row.therms)
            }
            json_body.append(json_row)
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
    
@app.get(API_ROOT + "/ffp/", response_model=List[FFP])
def read_ffp():
    query = ffp.select()
    with engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_body.append(jsonable_encoder(row))
        return json_body