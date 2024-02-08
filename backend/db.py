import sqlalchemy

from sqlalchemy import create_engine

from sqlalchemy import text

from sqlalchemy.orm import Session

import MySQLdb

engine = create_engine("mysql+mysqldb://root:@localhost/carbon_footprint?charset=utf8mb4", echo=True)

# "begin once"
# with engine.connect() as conn:
  # conn.execute(text("CREATE TABLE water (id int AUTO_INCREMENT PRIMARY KEY, cons int, date_paid datetime, total decimal(10,2))"))
  # conn.execute(
  #   text(
  #     "INSERT INTO water (cons, date_paid, total) VALUES (:cons, :date_paid, :total)"), 
  #     [{"cons": 7, "date_paid":	"2020-2-4", "total":	83.72}, 
  #      {"cons": 3, "date_paid":	"2020-4-3", "total":	35.88}, 
  #      {"cons": 4, "date_paid":	"2020-6-3", "total":	47.84}, 
  #      {"cons": 3, "date_paid":	"2020-8-6", "total":	35.88}, 
  #      {"cons": 3, "date_paid":	"2020-10-4", "total":	35.88}, 
  #      {"cons": 2, "date_paid":	"2020-12-3", "total":	35.88}, 
  #      {"cons": 4, "date_paid":	"2021-2-5", "total":	47.84}, 
  #      {"cons": 3, "date_paid":	"2021-4-16", "total":	35.88}, 
  #      {"cons": 3, "date_paid":	"2021-6-3", "total":	35.88}, 
  #      {"cons": 9, "date_paid":	"2021-8-5", "total":	107.64}, 
  #      {"cons": 3, "date_paid":	"2021-10-8", "total":	35.88}, 
  #      {"cons": 5, "date_paid":	"2021-12-12", "total":	59.8}, 
  #      {"cons": 3, "date_paid":	"2022-2-4", "total":	0}, 
  #      {"cons": 3, "date_paid":	"2023-2-25", "total":	36.69}, 
  #      {"cons": 7, "date_paid":	"2023-04-25", "total":	85.61}, 
  #      {"cons": 9, "date_paid":	"2023-6-25", "total":	110.07}, 
  #      {"cons": 5, "date_paid":	"2023-8-25", "total":	61.15}, 
  #      {"cons": 3, "date_paid":	"2023-10-25", "total":	36.69}, 
  #      {"cons": 4, "date_paid":	"2023-12-25", "total":	48.92}],
  # )

  # conn.commit()

# with engine.connect() as conn:
#   conn.execute(
#       text("INSERT INTO x_y_coordinates (x, y) VALUES (:x, :y)"),
#       [{"x": 6, "y": 8}, {"x": 9, "y": 10}],
#   )
#   conn.commit()

# with engine.connect() as conn:
#   conn.execute(
#       text("INSERT INTO x_y_coordinates (x, y) VALUES (:x, :y)"),
#       [{"x": 11, "y": 12}, {"x": 13, "y": 14}],
#   )
#   conn.commit()

with engine.connect() as conn:
  result = conn.execute(text("SELECT * FROM water"))
  for row in result:
      print(f"cons: {row.cons},  date_paid: {row.date_paid}, total: {row.total}")

# with engine.connect() as conn:
#   result = conn.execute(text("SELECT x, y FROM x_y_coordinates WHERE y > :y"), {"y": 2})
#   for row in result:
#       print(f"x: {row.x}  y: {row.y}")

# with Session(engine) as session:
#   result = session.execute(
#       text("UPDATE x_y_coordinates SET y=:y WHERE x=:x"),
#       [{"x": 9, "y": 11}, {"x": 13, "y": 15}],
#   )
#   session.commit()

# with engine.connect() as conn:
#   result = conn.execute(text("SELECT x, y FROM x_y_coordinates"))
#   for row in result:
#       print(f"x: {row.x}  y: {row.y}")



# from MySQLdb import _mysql

# db = _mysql(
#   host="localhost",
#   read_default_file=".my.cnf")

# with db.connect() as conn:
#   conn.execute("CREATE TABLE carbon_calculator (x int, y int)")
#   # conn.execute(
#   #     text("INSERT INTO x_y_coordinates (x, y) VALUES (:x, :y)"),
#   #     [{"x": 1, "y": 1}, {"x": 2, "y": 4}],
#   # )
#   conn.commit()