// put in example data loading code here
import pool from './pool';

pool.on('connect', () => {
    console.log('Connected to DB!');
});

pool.on('remove', () => {
    console.log('Client removed!');
    process.exit(0);
});

const usersLoadQuery =
`
  COPY users
  FROM '/Users/raymondchen/Documents/Projects/Apps/Web/coldcall/backend/api/app/db/data/Users.csv'
  DELIMITER ',' CSV HEADER
`;

const skillsLoadQuery =
`
  COPY skills
  FROM '/Users/raymondchen/Documents/Projects/Apps/Web/coldcall/backend/api/app/db/data/Skills.csv'
  DELIMITER ',' CSV HEADER
`;

const hasLoadQuery =
`
  COPY hasskill
  FROM '/Users/raymondchen/Documents/Projects/Apps/Web/coldcall/backend/api/app/db/data/HasSkill.csv'
  DELIMITER ',' CSV HEADER
`;

const wantLoadQuery =
`
  COPY wantskill
  FROM './Users/raymondchen/Documents/Projects/Apps/Web/coldcall/backend/api/app/db/data/WantSkill.csv'
  DELIMITER ',' CSV HEADER
`;

const availableLoadQuery =
`
  COPY availabilities
  FROM '/Users/raymondchen/Documents/Projects/Apps/Web/coldcall/backend/api/app/db/data/Availabilities.csv'
  DELIMITER ',' CSV HEADER
`;

const reservationLoadQuery =
`
  COPY reservations
  FROM '/Users/raymondchen/Documents/Projects/Apps/Web/coldcall/backend/api/app/db/data/Reservations.csv'
  DELIMITER ',' CSV HEADER
`;

const locationsLoadQuery =
`
  COPY locations
  FROM '/Users/raymondchen/Documents/Projects/Apps/Web/coldcall/backend/api/app/db/data/Locations.csv'
  DELIMITER ',' CSV HEADER
`;


/*
Load all tables in order:
Users
Skills
HasSkill
WantSkill
Availabilities
Locations
Reservations

I've tried like 5 different ways to solve this and
I can't so just run the setup script twice...
*/
function loadAllTables() {
    // create Users table
    pool.query(usersLoadQuery)
    .then((res) => {
        console.log(res);
        console.log("User table loaded");
    })
    .catch((err) => {
        console.log(err);
    })
    // create Skills table
    .then(pool.query(skillsLoadQuery))
    .then((res) => {
        console.log(res);
        console.log("Skills table loaded");
    })
    .catch((err) => {
        console.log(err);
    })
    // create Locations table
    .then(pool.query(locationsLoadQuery))
    .then((res) => {
        console.log(res);
        console.log("Locations table loaded");
    })
    .catch((err) => {
        console.log(err);
    })
    // create Availabilities table
    .then(pool.query(availableLoadQuery))
    .then((res) => {
        console.log(res);
        console.log("Availabilities table loaded");
    })
    .catch((err) => {
        console.log(err);
    })
    // create HasSkills table
    .then(pool.query(hasLoadQuery))
    .then((res) => {
        console.log(res);
        console.log("HasSkills table loaded");
    })
    .catch((err) => {
        console.log(err);
    })
    // create WantsSkills table
    .then(pool.query(wantLoadQuery))
    .then((res) => {
        console.log(res);
        console.log("WantsSkills table loaded");
    })
    .catch((err) => {
        console.log(err);
    })
    // create Reservations table
    .then(pool.query(reservationLoadQuery))
    .then((res) => {
        console.log(res);
        console.log("Reservations table loaded");
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    })
    ;
};

export { loadAllTables };
require('make-runnable');