# Readme

## Setting up the backend

The backend uses `pipenv 2023.12.1` for package management. Make sure you have that before you begin. It also requires MySQL.

### Setting up MySQL

1. Create a database called `carbon_footprint`
2. Import the `carbon_footprint_initialize.sql` file.

### Installing the packages and running the API

1. cd into the `backend` folder
2. Run `pipenv install`
3. Run `pipenv shell` to use the environment
4. Run `uvicorn main:app --reload --port 8000` to get it up and running on http://localhost:8000

## Setting up the frontend

The frontend uses `node 18.17.1` for package management. Make sure you have that before you begin.

### Installing the packages and running the app

1. cd into the `frontend` folder
2. Run `npm install`
3. Run `npm run dev` to get it up and running on http://localhost:3001

## Notes

Right now it's manual entry for the records, but in the future, it will include a way to add rows to tables in the UI.
