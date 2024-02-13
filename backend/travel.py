import sqlalchemy
import connection
from pydantic import BaseModel
from typing import List
from fastapi.encoders import jsonable_encoder
from typing import Optional

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

app = connection.app
@app.get(connection.API_ROOT + "/travel/", response_model=List[Travel])
def read_travel():
    query = travel.select()
    with connection.engine.connect() as conn:
        result = conn.execute(query)
        json_body = []
        for row in result:
            json_body.append(jsonable_encoder(row))
        return json_body