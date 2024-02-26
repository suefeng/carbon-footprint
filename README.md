# Readme

## Setting up the backend

The backend uses `pipenv 2023.12.1` for package management. Make sure you have that before you begin. It also requires MySQL, so make sure you have that.

### Setting up MySQL

1. If you don't have MySQL, run `brew install mysql`.
2. Create the database and tables by running `mysql -u root -p < carbon_footprint_initialize.sql`.
3. Create a `.env` file and add `DATABASE_URL="mysql+mysqldb://root:@localhost/carbon_footprint?charset=utf8mb4"` as the database url.

### Installing the packages and running the API

1. cd into the `backend` folder
2. Run `pipenv install`
3. Run `pipenv shell` to use the environment
4. Run `uvicorn main:app --reload --port 8000` to get it up and running on http://localhost:8000

## Setting up the frontend

The frontend uses `node 18.17.1` for package management. Make sure you have that before you begin.

It uses Next.js app routes for the framework and Material UI `DataGrid` and `GridToolbar` for displaying the data.

### Installing the packages and running the app

1. cd into the `frontend` folder
2. Run `npm install`
3. Run `npm run dev` to get it up and running on http://localhost:3001

## Notes

Right now it's manual entry for the records, but in the future, it will include a way to add rows to tables in the UI.
