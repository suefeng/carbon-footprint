import sqlalchemy
import connection
from pydantic import BaseModel
from typing import List
from fastapi.encoders import jsonable_encoder

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

app = connection.app
@app.get(connection.API_ROOT + "/water/", response_model=List[Water])
def read_water():
    query = water.select()
    with connection.engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_body.append(jsonable_encoder(row))
        return json_body