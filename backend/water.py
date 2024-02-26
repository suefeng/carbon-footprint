import sqlalchemy
import connection
from pydantic import BaseModel
from typing import List
from fastapi.encoders import jsonable_encoder
import utilities

water = sqlalchemy.Table(
    "water",
    connection.metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("cons", sqlalchemy.Integer),
    sqlalchemy.Column("date_paid", sqlalchemy.Date),
    sqlalchemy.Column("total", sqlalchemy.Float),
)

class Water(BaseModel):
    id: int
    cons: int
    date_paid: str
    total: float
    tons_co2: float

app = connection.app
@app.get(connection.API_ROOT + "/water/", response_model=List[Water])
def read_water():
    query = water.select()
    with connection.engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_row = {
                "id": row.id,
                "cons": row.cons,
                "date_paid": row.date_paid.strftime("%Y-%m-%d"),
                "total": row.total,
                "tons_co2": utilities.tons_water(row.cons)
            }
            json_body.append(json_row)
        return json_body