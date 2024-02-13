import sqlalchemy
import connection
from pydantic import BaseModel
from typing import List
from fastapi.encoders import jsonable_encoder

ffp = sqlalchemy.Table(
    "fossil_fuel_percentage",
    connection.metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("year", sqlalchemy.Integer),
    sqlalchemy.Column("percentage", sqlalchemy.Integer),
)

class FFP(BaseModel):
    id: int
    year: int
    percentage: int

app = connection.app
@app.get(connection.API_ROOT + "/ffp/", response_model=List[FFP])
def read_ffp():
    query = ffp.select()
    with connection.engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_body.append(jsonable_encoder(row))
        return json_body