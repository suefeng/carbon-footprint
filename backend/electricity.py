import sqlalchemy
import connection
from pydantic import BaseModel
from typing import List
import consts

electricity = sqlalchemy.Table(
    "electricity",
    connection.metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("date", sqlalchemy.Date),
    sqlalchemy.Column("kwh", sqlalchemy.Integer),
    sqlalchemy.Column("low", sqlalchemy.Integer),
    sqlalchemy.Column("high", sqlalchemy.Integer),
)

class Electricity(BaseModel):
    id: int
    date: str
    kwh: int
    low: int
    high: int
    tons_co2: float

app = connection.app
@app.get(connection.API_ROOT + "/electricity/", response_model=List[Electricity])
def read_electricity():
    query = electricity.select()
    with connection.engine.connect() as conn:
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
                "tons_co2": consts.TONS_KWH(row.kwh, percentage)
            }
            json_body.append(json_row)
        return json_body