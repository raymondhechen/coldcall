# Cold Call
Connecting, Learning, and Empowering


## Frontend
ReactJS

## Backend
Flask, PostgreSQL

### SQL Instructions
Before running the instructions to setup the database, navigate to the load.sql file in the coldcall/backend/database folder. Change the paths of the csv files such that it matches the paths of the csv files on your local machine.
To create the database, run these commands in terminal:
- dropdb coldcall
- createdb coldcall;
- psql coldcall -af backend/database/create.sql
- psql coldcall -af backend/database/load.sql

