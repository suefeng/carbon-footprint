import sqlalchemy
import connection
from pydantic import BaseModel
from typing import List
from fastapi.encoders import jsonable_encoder
from typing import Optional
import utilities

travel = sqlalchemy.Table(
    "travel",
    connection.metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("type", sqlalchemy.String),
    sqlalchemy.Column("date", sqlalchemy.Date),
    sqlalchemy.Column("location", sqlalchemy.String),
    sqlalchemy.Column("time", sqlalchemy.String),
    sqlalchemy.Column("miles", sqlalchemy.Integer),
)

class Travel(BaseModel):
    id: int
    type: str
    date: str
    location: str
    time: Optional[str] = None
    miles: int
    tons_co2: float

app = connection.app
@app.get(connection.API_ROOT + "/travel/", response_model=List[Travel])

def read_travel():
    query = travel.select()
    with connection.engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_row = {
                "id": row.id,
                "type": row.type,
                "date": row.date.strftime("%Y-%m-%d"),
                "location": row.location,
                "time": row.time,
                "miles": row.miles,
                "tons_co2": utilities.tons_co2(float(row.miles), row.type)
            }
            json_body.append(json_row)
        return json_body