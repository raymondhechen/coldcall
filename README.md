# Cold Call
Connecting, Learning, and Empowering

# Technical Details
## Frontend
ReactJS, Styled-Components
### Setup Instructions
- run `npm run start` for development build
- run `npm run build` for deployment build

## Backend
ExpressJS, PostgreSQL
### Setup Instructions
- run `npm run build` for all builds


# Database Instructions
Our backend allows you to directly build an empty database with our schemas in a local postgreSQL server. 
Before running the instructions to setup the database, navigate to the load.sql file in the coldcall/backend/database folder. Change the paths of the csv files such that it matches the paths of the csv files on your local machine.
To create the database, run these commands in terminal:
- dropdb coldcall
- createdb coldcall;
- psql coldcall -af backend/database/create.sql
- psql coldcall -af backend/database/load.sql



## Tutorials
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

