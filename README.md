# Cold Call
Connecting, Learning, and Empowering

## Note
This system version was built and designed to meet specifications for Duke University's COMPSCI 316 course on databases. 

# Technical Details
## Frontend
ReactJS, Styled-Components
### Setup Instructions
- run `npm run start` for dev build

## Backend
ExpressJS, PostgreSQL
### Setup Instructions
- run `npm run build` for dev build
### Database Instructions
Our backend allows you to directly build an empty database with our schemas in a local postgreSQL server. 
Database construction and initialization queries are found within backend/api/app/db/dbCreate.js. 
PostgreSQL must be installed locally and run in order for the backend to work locally. 
Furthermore, the environment variables must be corrected in a .env file to accurately connect to the local database.
From there, you can use Postman to test the API endpoints. 
The API endpoints are found in the routes folder in the backend, and the actuall functions they call are found in the controllers folder in the backend.

# Sources Used
### Javascript
- https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
- https://stackoverflow.com/questions/5000415/call-a-function-after-previous-function-is-complete


### Backend
- https://itnext.io/building-restful-api-with-node-js-express-js-and-postgresql-the-right-way-b2e718ad1c66
- https://gist.github.com/laurenfazah/f9343ae8577999d301334fc68179b485

### Frontend
- https://spectrum.chat/styled-components/general/target-parent-from-child-event~060e9d4f-1da8-45a9-ada4-ed2b14a175b1
- https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
- https://tylermcginnis.com/react-router-programmatically-navigate/
- https://reactjs.org/docs/state-and-lifecycle.html
- https://www.freecodecamp.org/news/how-to-understand-a-components-lifecycle-methods-in-reactjs-e1a609840630/
- https://stackoverflow.com/questions/34875557/creating-custom-function-in-react-component
- https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js