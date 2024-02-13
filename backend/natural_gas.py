import sqlalchemy
import connection
from pydantic import BaseModel
from typing import List
from fastapi.encoders import jsonable_encoder
import consts

natural_gas = sqlalchemy.Table(
    "natural_gas",
    connection.metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("month", sqlalchemy.String),
    sqlalchemy.Column("therms", sqlalchemy.Integer),
    sqlalchemy.Column("average_temperature", sqlalchemy.Integer),
)

class NaturalGas(BaseModel):
    id: int
    month: str
    therms: int
    average_temperature: int
    tons_co2: float

app = connection.app
@app.get(connection.API_ROOT + "/natural-gas/", response_model=List[NaturalGas])
def read_natural_gas():
    query = natural_gas.select()
    with connection.engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_row = {
                "id": row.id,
                "month": row.month,
                "therms": row.therms,
                "average_temperature": row.average_temperature,
                "tons_co2": consts.TONS_THERM(row.therms)
            }
            json_body.append(json_row)
        return json_body