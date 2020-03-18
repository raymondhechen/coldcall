import pool from './pool';

pool.on('connect', () => {
    console.log('Connected to DB!');
});

/**
 * Create User Table
 * CREATE TABLE test
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL, 
  phone VARCHAR(100));
*/
const createUserTable = () => {
    const userCreateQuery = 
        `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY, 
            email VARCHAR(100) UNIQUE NOT NULL, 
            first_name VARCHAR(100), 
            last_name VARCHAR(100), 
            password VARCHAR(100) NOT NULL,
            created_on DATE NOT NULL
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

/**
 * Create Buses Table
 */
const createReservationTable = () => {
    const reservationCreateQuery = 
        `
        CREATE TABLE IF NOT EXISTS reservation (
            id SERIAL PRIMARY KEY,
            user1_id SERIAL NOT NULL REFERENCES users(id),
            user2_id SERIAL NOT NULL REFERENCES users(id),
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

/**
 * Create Trip Table
 */
const createTripTable = () => {
  const tripCreateQuery = `CREATE TABLE IF NOT EXISTS trip
    (id SERIAL PRIMARY KEY, 
    bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE,
    origin VARCHAR(300) NOT NULL, 
    destination VARCHAR(300) NOT NULL,
    trip_date DATE NOT NULL,
    fare float NOT NULL,
    status float DEFAULT(1.00),
    created_on DATE NOT NULL)`;

  pool.query(tripCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Booking Table
 */
const createBookingTable = () => {
  const bookingCreateQuery = `CREATE TABLE IF NOT EXISTS booking(id SERIAL, 
    trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE,
    trip_date DATE, 
    seat_number INTEGER UNIQUE,      
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,      
    created_on DATE NOT NULL,
    PRIMARY KEY (id, trip_id, user_id))`;
  pool.query(bookingCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const usersDropQuery = 'DROP TABLE IF EXISTS users';
  pool.query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop Bus Table
 */
const dropReservationTable = () => {
  const reservationDropQuery = 'DROP TABLE IF EXISTS reseravtion';
  pool.query(reservationDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Trip Table
 */
const dropTripTable = () => {
  const tripDropQuery = 'DROP TABLE IF EXISTS trip';
  pool.query(tripDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Bus Table
 */
const dropBookingTable = () => {
  const bookingDropQuery = 'DROP TABLE IF EXISTS booking';
  pool.query(bookingDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Create All Tables
 */
const createAllTables = () => {
    createUserTable();
    createReservationTable();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
    dropUserTable();
    dropReservationTable();
    dropTripTable();
    dropBookingTable();
};

pool.on('remove', () => {
    console.log('Client removed!');
    process.exit(0);
});


export {
    createAllTables,
    dropAllTables,
};

require('make-runnable');