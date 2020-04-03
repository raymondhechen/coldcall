Since milestone 1, we've introduced several changes to our database system. The ER diagram for this new database system has not truly changed that much, but the new schema differs in a few areas. The new database schema is as follows:

For our platform, we decided to go full-stack javascript. For the backend, we chose ExpressJS, which we used to create a REST API. The backend will directly make calls to a PostgreSQL database to obtain, write, or manipulate our data. Those queries to the database can be made through our API's endpoints. For the frontend framework, we chose ReactJS. The frontend consumes the backend REST API and serves as the user's client-facing controller for getting and writing data to the database.

