import sqlalchemy
import connection
from pydantic import BaseModel
from typing import List
import consts
from fastapi.encoders import jsonable_encoder

electricity = sqlalchemy.Table(
    "electricity",
    connection.metadata,
    sqlalchemy.Column("date", sqlalchemy.Date),
    sqlalchemy.Column("kwh", sqlalchemy.Integer),
)

water = sqlalchemy.Table(
    "water",
    connection.metadata,
    sqlalchemy.Column("date", sqlalchemy.Date),
    sqlalchemy.Column("cons", sqlalchemy.Integer),
)

travel = sqlalchemy.Table(
    "travel",
    connection.metadata,
    sqlalchemy.Column("date", sqlalchemy.Date),
    sqlalchemy.Column("type", sqlalchemy.String),
    sqlalchemy.Column("miles", sqlalchemy.String),
)

natural_gas = sqlalchemy.Table(
    "natural_gas",
    connection.metadata,
    sqlalchemy.Column("month", sqlalchemy.String),
    sqlalchemy.Column("therms", sqlalchemy.Integer),
)

class All(BaseModel):
    year: int
    water: float
    electricity: float
    natural_gas: float
    travel: float
    total: float


app = connection.app
@app.get(connection.API_ROOT + "/all/", response_model=List[All])
def read_all():
    electricity_query = electricity.select(electricity, sqlalchemy.func.sum(electricity.columns.kwh).label('electricity')
                ).group_by(sqlalchemy.func.year(electricity.columns.date))

    water_query = water.select()
    travel_query = travel.select()
    natural_gas_query = natural_gas.select()

    with connection.engine.connect() as conn:
        electricity_result = conn.execute(electricity_query)
        water_result = conn.execute(water_query)
        travel_result = conn.execute(travel_query)
        natural_gas_result = conn.execute(natural_gas_query)

        for row in electricity_result:
            print(row)

    json_body = [{
        "year": 2021,
        "water": 0,
        "electricity": 0,
        "natural_gas": 0,
        "travel": 0,
        "total": 0
    }]
    return jsonable_encoder(json_body)
        # electricity_total = []
        # for row in electricity:
        #     year = int(row.date.strftime("%Y"))
        #     percentage = conn.execute(f"SELECT percentage FROM fossil_fuel_percentage where year = {year}").first()[0]
        #     electricity_total.append({"year": year, "tons_co2": consts.TONS_KWH(row.kwh, percentage)}) 
        
        # water_total = []
        # for row in water:
        #     year = int(row.date.strftime("%Y"))
        #     water_total.append({"year": year, "cons": row.cons})
        
        # travel_car_total = []
        # travel_plane_total = []
        # for row in travel:
        #     year = int(row.date.strftime("%Y"))
        #     if row.type == "car":
        #         travel_car_total.append({"year": year, "miles": row.miles})
        #     elif row.type == "plane":
        #         travel_plane_total.append({"year": year, "miles": row.miles})

        # natural_gas_total = 0
        # for row in natural_gas:
        #     year = int(row.month.split(" ")[1])
        #     natural_gas_total.append({"year": year, "tons_co2": consts.TONS_THERM(row.therms)})
            