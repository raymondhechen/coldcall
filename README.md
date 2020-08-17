# We're now [coldcall.co](https://coldcall.co)!
<br>

# Cold Call
Connecting, Learning, and Empowering students.

## Note
This system was built and designed to meet specifications for Duke University's COMPSCI 316 course on databases.

## Instructions
To run this platform locally for development/testing purposes, following the instructions below after cloning the repository. Make sure you have ReactJS, ExpressJS, and NodeJS installed. The remaining dependencies that need to be installed can be found by running the platform and checking the errors. (react-router-dom, styled-components, jwt-auth, etc.)

#### Frontend:
- cd to /frontend directory
- Execute command: `npm run start`
- Frontend should load in a browser window

#### Backend:
- Run PostgreSQL (assuming already installed) 
- Create database “coldcall” → `CREATE DATABASE coldcall`
- Copy DATABASE_URL from PostgreSQL and replace in /backend/api/.env
- Make sure copied in the proper PostgreSQL credentials (username, password). It should still be @localhost:5432 since that's the default port. 
- Access /backend/api/app/db/dbLoad.js and replace file paths in queries with full file paths of the data files, which are accessible in the /data directory in the same path (do not use relative paths as Postrgres cannot interpret them)
- cd to /backend/api directory
- Execute command: `npm run build`
- This command creates the relations in the "coldcall" PostgreSQL database, along with loading all of our production data
- Access API endpoints to check if successfully deployed (ex. localhost:3000/api/users)
