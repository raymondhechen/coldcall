### Milestone 2 Update
Since milestone 1, we've introduced very minor changes to our database system. The ER diagram for this new database system has not truly changed much, but the new schema differs in a minor areas. The new database schema is as follows:

- Users(uid, email, first_name, last_name, password, created)
- Skills(sid,topic,skill_name) 
- HasSkill(sid,topic,skill_name) 
- WantSkill(sid,sid,skill_name) 
- Availabilities(uid,start_time,end_time) 
- Reservations(rid,student_uid, teacher_uid, start_time, end_time, sid, lid, finished, time_created) 
- Locations(lid, loc_name, place)

For our platform, we decided to go full-stack javascript. For the backend, we chose ExpressJS, which we used to create a REST API. The backend will directly make calls to a PostgreSQL database to obtain, write, or manipulate our data. Those queries to the database can be made through our API's endpoints. For the frontend framework, we chose ReactJS. The frontend consumes the backend REST API and serves as the user's client-facing controller for getting and writing data to the database.

We've currently made significant progress on both backend and frontend development. We've essentially constructed the majority of the frontend's landing, authorization, and main platform pages, but more work still needs to be done. Specifically, we'll need to implement frontend authorization systems and dynamic routing too. As for the backend, we've generally completed development of our API and are beginning testing. The API endpoints appear to work properly and the database system appears to be working as planned too. Next steps for the backend involve authorization systems too.

Instructions about using our system and initializing the database can be found in README.md. The database intialization instructions are repeated below. Our project is being deployed using Heroku and the frontend can be accessible with the following link: https://coldcall-frontend.herokuapp.com

#### Database Instructions
Our backend allows you to directly build an empty database with our schemas in a local postgreSQL server. 
Database construction and initialization queries are found within backend/api/app/db/dbCreate.js. 
PostgreSQL must be installed locally and run in order for the backend to work locally. 
Furthermore, the environment variables must be corrected in a .env file to accurately connect to the local database.
From there, you can use Postman to test the API endpoints. 
The API endpoints are found in the routes folder in the backend, and the actuall functions they call are found in the controllers folder in the backend.

To sum it up:
- run `createdb coldcall` to build the database 
- run `npm run build` to build the schemas 
- run `psql coldcall -af backend/db/load.sql` to load the data 
