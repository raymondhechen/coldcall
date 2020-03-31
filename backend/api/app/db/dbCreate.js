import pool from './pool';

pool.on('connect', () => {
    console.log('Connected to DB!');
});


// create user table
const createUserTable = () => {
    const userCreateQuery = 
    `
    CREATE TABLE IF NOT EXISTS Users (
        uid SERIAL PRIMARY KEY NOT NULL, 
        email VARCHAR(100) UNIQUE NOT NULL, 
        first_name VARCHAR(100), 
        last_name VARCHAR(100), 
        password VARCHAR(100) NOT NULL, 
        created DATE NOT NULL 
        )
    `;
    pool.query(userCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

// create skills table
const createSkillsTable = () => {
    const userSkillsQuery = 
    `
    CREATE TABLE IF NOT EXISTS Skills (
        uid SERIAL NOT NULL REFERENCES Users(uid), 
        topic VARCHAR(256) NOT NULL, 
        skill VARCHAR(256) NOT NULL,
        PRIMARY KEY (uid, skill)
        )
    `;
    pool.query(userSkillsQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

// create learning table
const createLearnTable = () => {
    const learnCreateQuery = 
    `
    CREATE TABLE IF NOT EXISTS WantsToLearn (
        uid SERIAL NOT NULL REFERENCES Users(uid), 
        topic VARCHAR(256) NOT NULL, 
        skill VARCHAR(256) NOT NULL,
        PRIMARY KEY (uid, skill)
        )
    `;
    pool.query(learnCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

// create availabilities table
const createAvailabilitiesTable = () => {
    const availableCreateQuery = 
    `
    CREATE TABLE IF NOT EXISTS Availabilities (
        uid SERIAL NOT NULL REFERENCES Users(uid), 
        start_time DATE NOT NULL,
        end_time DATE NOT NULL, 
        PRIMARY KEY (uid, start_time, end_time)
        )
    `;
    pool.query(availableCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

// create reservations table
const createReservationTable = () => {
    const reservationCreateQuery = 
    `
    CREATE TABLE IF NOT EXISTS Reservations (
        reservation_id SERIAL PRIMARY KEY,
        student_id SERIAL NOT NULL REFERENCES Users(uid),
        teacher_id SERIAL NOT NULL REFERENCES Users(uid),
        start_time DATE NOT NULL,
        end_time DATE NOT NULL CHECK (end_time > start_time),
        location varchar(256) NOT NULL
    )
    `;
    pool.query(reservationCreateQuery)
        .then((res) => {
        console.log(res);
        pool.end();
        })
        .catch((err) => {
        console.log(err);
        pool.end();
        });
};


// create all tables
const createAllTables = () => {
    createUserTable();
    createSkillsTable();
    createLearnTable();
    createAvailabilitiesTable();
    createReservationTable();
};


pool.on('remove', () => {
    console.log('Client removed!');
    process.exit(0);
});

export { createAllTables };
require('make-runnable');