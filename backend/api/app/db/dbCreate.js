import pool from './pool';

pool.on('connect', () => {
    console.log('Connected to DB!');
});

pool.on('remove', () => {
    console.log('Client removed!');
    process.exit(0);
});

const usersCreateQuery = 
`
CREATE TABLE IF NOT EXISTS Users (
    uid SERIAL PRIMARY KEY, 
    email VARCHAR(256) UNIQUE NOT NULL, 
    first_name VARCHAR(256), 
    last_name VARCHAR(256), 
    password VARCHAR(256) NOT NULL, 
    created DATE NOT NULL 
    )
`;

const skillsCreateQuery = 
`
CREATE TABLE IF NOT EXISTS Skills (
    sid SERIAL PRIMARY KEY, 
    topic VARCHAR(256) NOT NULL, 
    skill_name VARCHAR(256) NOT NULL
    )
`;

const hasCreateQuery = 
`
CREATE TABLE IF NOT EXISTS HasSkill (
    uid SERIAL NOT NULL REFERENCES Users(uid), 
    sid SERIAL NOT NULL REFERENCES Skills(sid),
    PRIMARY KEY (uid, sid)
    )
`;

const wantCreateQuery = 
`
CREATE TABLE IF NOT EXISTS WantSkill (
    uid SERIAL NOT NULL REFERENCES Users(uid), 
    sid SERIAL NOT NULL REFERENCES Skills(sid), 
    PRIMARY KEY (uid, sid)
    )
`;

const availableCreateQuery = 
`
CREATE TABLE IF NOT EXISTS Availabilities (
    uid SERIAL NOT NULL REFERENCES Users(uid), 
    start_time DATE NOT NULL,
    end_time DATE NOT NULL, 
    PRIMARY KEY (uid, start_time, end_time)
    )
`;

const reservationCreateQuery = 
`
CREATE TABLE IF NOT EXISTS Reservations (
    rid SERIAL PRIMARY KEY,
    student_id SERIAL NOT NULL REFERENCES Users(uid),
    teacher_id SERIAL NOT NULL REFERENCES Users(uid),
    start_time DATE NOT NULL,
    end_time DATE NOT NULL CHECK (end_time > start_time),
    sid SERIAL NOT NULL REFERENCES Skills(sid), 
    location VARCHAR(256) NOT NULL REFERENCES Locations(loc_name)
)
`;

const locationsCreateQuery = 
`
CREATE TABLE IF NOT EXISTS Locations (
    loc_name VARCHAR(256) PRIMARY KEY,
    place VARCHAR(256) NOT NULL
)
`;


/* 
create all tables in order:
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
function createAllTables() {
    // create Users table
    pool.query(usersCreateQuery)
    .then((res) => {
        console.log(res);
        console.log("User table created");
    })
    .catch((err) => {
        console.log(err);
    })
    // create Skills table
    .then(pool.query(skillsCreateQuery))
    .then((res) => {
        console.log(res);
        console.log("Skills table created");
    })
    .catch((err) => {
        console.log(err);
    })
    // create Locations table
    .then(pool.query(locationsCreateQuery))
    .then((res) => {
        console.log(res);
        console.log("Locations table created");
    })
    .catch((err) => {
        console.log(err);
    })
    // create Availabilities table
    .then(pool.query(availableCreateQuery))
    .then((res) => {
        console.log(res);
        console.log("Availabilities table created");
    })
    .catch((err) => {
        console.log(err);
    })
    // create HasSkills table
    .then(pool.query(hasCreateQuery))
    .then((res) => {
        console.log(res);
        console.log("HasSkills table created");
    })
    .catch((err) => {
        console.log(err);
    })
    // create WantsSkills table
    .then(pool.query(wantCreateQuery))
    .then((res) => {
        console.log(res);
        console.log("WantsSkills table created");
    })
    .catch((err) => {
        console.log(err);
    })
    // create Reservations table
    .then(pool.query(reservationCreateQuery))
    .then((res) => {
        console.log(res);
        console.log("Reservations table created");
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    })
    ;
};

export { createAllTables };
require('make-runnable');