import pool from './pool';

pool.on('connect', () => {
    console.log('Connected to DB!');
});


// create user table
function createUserTable(callback) {
    console.log("Users Table Created");
    const userCreateQuery = 
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
    pool.query(userCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    return callback();
};

// create skills table
function createSkillsTable(callback) {
    console.log("Skills Table Created");
    const skillsCreateQuery = 
    `
    CREATE TABLE IF NOT EXISTS Skills (
        id SERIAL PRIMARY KEY, 
        topic VARCHAR(256) NOT NULL, 
        skill_name VARCHAR(256) NOT NULL
        )
    `;
    pool.query(skillsCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    return callback();
};

// create has table
function createHasTable(callback) {
    console.log("Has Table Created");
    const hasCreateQuery = 
    `
    CREATE TABLE IF NOT EXISTS HasSkill (
        uid SERIAL NOT NULL REFERENCES Users(uid), 
        sid SERIAL NOT NULL REFERENCES Skills(id), 
        PRIMARY KEY (uid, sid)
        )
    `;
    pool.query(hasCreateQuery)
        .then((res) => {
            console.log(res);
            callback();
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    return callback();
};

// create learning table
function createWantTable(callback) {
    console.log("Wants Table Created");
    const wantCreateQuery = 
    `
    CREATE TABLE IF NOT EXISTS WantSkill (
        uid SERIAL NOT NULL REFERENCES Users(uid), 
        sid SERIAL NOT NULL REFERENCES Skills(id), 
        PRIMARY KEY (uid, sid)
        )
    `;
    pool.query(wantCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    return callback();
};

// create availabilities table
function createAvailabilitiesTable(callback) {
    console.log("Availabilities Table Created");
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

    return callback();
};

// create reservations table
function createReservationTable() {
    console.log("Reservations Table Created");
    const reservationCreateQuery = 
    `
    CREATE TABLE IF NOT EXISTS Reservations (
        rid SERIAL PRIMARY KEY,
        student_id SERIAL NOT NULL REFERENCES Users(uid),
        teacher_id SERIAL NOT NULL REFERENCES Users(uid),
        start_time DATE NOT NULL,
        end_time DATE NOT NULL CHECK (end_time > start_time),
        sid SERIAL NOT NULL REFERENCES Skills(id), 
        location VARCHAR(256) NOT NULL REFERENCES Locations(loc_name)
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

// create reservations table
function createLocationTable(callback) {
    console.log("Location Table Created");
    const locationsCreateQuery = 
    `
    CREATE TABLE IF NOT EXISTS Locations (
        loc_name VARCHAR(256) PRIMARY KEY,
        place VARCHAR(256) NOT NULL
    )
    `;
    pool.query(locationsCreateQuery)
        .then((res) => {
        console.log(res);
        pool.end();
        })
        .catch((err) => {
        console.log(err);
        pool.end();
        });

    return callback();
};


/* create all tables in order:
Users
Skills
HasSkill
WantSkill
Availabilities
Locations
Reservations
*/
function createAllTables() {
    createUserTable(function() {
        createSkillsTable(function() {
            createHasTable(function() {
                createWantTable(function() {
                    createAvailabilitiesTable(function() {
                        createLocationTable(function() {
                            createReservationTable();
                        });
                    });
                });
            });
        });
    });
};


pool.on('remove', () => {
    console.log('Client removed!');
    process.exit(0);
});

export { createAllTables };
require('make-runnable');