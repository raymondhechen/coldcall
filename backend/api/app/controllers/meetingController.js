import moment from 'moment';
import dbQuery from '../db/dbQuery';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { empty } from '../middlewares/validations';
import { errorMessage, successMessage, status } from '../middlewares/status';

dotenv.config();

/**
 * Create a reservation
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const createReservation = async (req, res) => {
    const { uid, date, time, topic, skill, location, place  } = req.body;
    console.log(uid);
    console.log(date);
    console.log(time);
    console.log(topic);
    console.log(skill);
    console.log(location);
    console.log(place);
    const { token } = req.headers;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    const decoded = jwt.verify(token, process.env.SECRET);   

    if (empty(uid) || empty(date) || empty(time) || empty(topic) || empty(skill) || empty(location) || empty(place)) {
        errorMessage.error = 'Missing information';
        return res.status(status.bad).send(errorMessage);
    }
    const createReservationQuery = 
    `
    INSERT INTO 
    Reservations(student_id, teacher_id, date, start_time, end_time, finished, time_created, sid, lid)

    (
    SELECT * 
    FROM
    (VALUES(CAST($1 AS INTEGER), CAST($2 AS INTEGER), to_date($3, 'YYYY-MM-DD'), to_timestamp($4, 'HH24:MI:SS'), to_timestamp($4, 'HH24:MI:SS') + '1 hour', false, current_date)) AS Info

    CROSS JOIN

    (
        SELECT * 
        FROM
        (
            (SELECT sid
            FROM skills
            WHERE topic = $5 AND skill_name = $6) AS skillID
        
            CROSS JOIN 
        
            (SELECT lid
            FROM locations
            WHERE loc_name = $7 AND place = $8) AS locID
        ) AS Info
    ) AS Combined
    )

    RETURNING *
    `;
    const values = [
        decoded.uid,
        uid,
        date, 
        time, 
        topic,
        skill, 
        location, 
        place
    ];

    try {
        const { rows } = await dbQuery.query(createReservationQuery, values);
        const dbResponse = rows[0];
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    } 
    catch (error) {
        errorMessage.error = 'Unable to create reservation';
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Get all reservations
 * @param {object} req 
 * @param {object} res 
 * @returns {object} buses array
 */
const getReservations = async (req, res) => {
    const { token } = req.headers;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    const getReservationsQuery = 'SELECT rid, uidl, firstl, lastl, emaill, uidt, firstt, lastt, emailt, CAST(date AS VARCHAR), CAST(start_time AS VARCHAR), CAST(end_time AS VARCHAR), topic, skill_name AS skill, loc_name AS loc, place FROM ((( ( SELECT * FROM Reservations WHERE student_id = $1 OR teacher_id = $1 ORDER BY start_time ASC) as R JOIN (SELECT uid AS uidL, first_name AS firstL, last_name AS lastL, email AS emailL FROM Users) AS L ON R.student_id = L.uidL ) AS R2 JOIN ( SELECT uid AS uidT, first_name AS firstT, last_name AS lastT, email AS emailT FROM Users ) AS T ON R2.teacher_id = T.uidT ) AS C JOIN ( SELECT * FROM Skills ) AS S ON C.sid = S.sid ) AS C2 JOIN (SELECT * FROM Locations ) AS L ON C2.lid = L.lid ORDER BY start_time';
    try {
        const { rows } = await dbQuery.query(getReservationsQuery, [decoded.uid]);
        const dbResponse = rows;
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } 
    catch (error) {
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Get all learnings
 * @param {object} req 
 * @param {object} res 
 * @returns {object} buses array
 */
const getLearnings = async (req, res) => {
    const { token } = req.headers;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    const getReservationsQuery = 'SELECT rid, uidl, firstl, lastl, emaill, uidt, firstt, lastt, emailt, CAST(date AS VARCHAR), CAST(start_time AS VARCHAR), CAST(end_time AS VARCHAR), topic, skill_name AS skill, loc_name AS loc, place FROM ((( ( SELECT * FROM Reservations WHERE student_id = $1 ORDER BY start_time ASC) as R JOIN (SELECT uid AS uidL, first_name AS firstL, last_name AS lastL, email AS emailL FROM Users) AS L ON R.student_id = L.uidL ) AS R2 JOIN ( SELECT uid AS uidT, first_name AS firstT, last_name AS lastT, email AS emailT FROM Users ) AS T ON R2.teacher_id = T.uidT ) AS C JOIN ( SELECT * FROM Skills ) AS S ON C.sid = S.sid ) AS C2 JOIN (SELECT * FROM Locations ) AS L ON C2.lid = L.lid ORDER BY start_time';;
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        const { rows } = await dbQuery.query(getReservationsQuery, [decoded.uid]);
        const dbResponse = rows;
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } 
    catch (error) {
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Get all reservations
 * @param {object} req 
 * @param {object} res 
 * @returns {object} buses array
 */
const getTeachings = async (req, res) => {
    const { token } = req.headers;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    const getReservationsQuery = 'SELECT rid, uidl, firstl, lastl, emaill, uidt, firstt, lastt, emailt, CAST(date AS VARCHAR), CAST(start_time AS VARCHAR), CAST(end_time AS VARCHAR), topic, skill_name AS skill, loc_name AS loc, place FROM ((( ( SELECT * FROM Reservations WHERE teacher_id = $1 ORDER BY start_time ASC) as R JOIN (SELECT uid AS uidL, first_name AS firstL, last_name AS lastL, email AS emailL FROM Users) AS L ON R.student_id = L.uidL ) AS R2 JOIN ( SELECT uid AS uidT, first_name AS firstT, last_name AS lastT, email AS emailT FROM Users ) AS T ON R2.teacher_id = T.uidT ) AS C JOIN ( SELECT * FROM Skills ) AS S ON C.sid = S.sid ) AS C2 JOIN (SELECT * FROM Locations ) AS L ON C2.lid = L.lid ORDER BY start_time';;
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        const { rows } = await dbQuery.query(getReservationsQuery, [decoded.uid]);
        const dbResponse = rows;
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } 
    catch (error) {
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Delete reservation
 * @param {object} req 
 * @param {object} res 
 * @returns {void} return response booking deleted successfully
 */
const deleteReservation = async (req, res) => {
  const { token, rid } = req.headers;
  if (!token) {
      errorMessage.error = 'Token not provided';
      return res.status(status.bad).send(errorMessage);
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  const deleteResQuery = 'DELETE FROM Reservations WHERE rid = $1 AND (student_id = $2 OR teacher_id = $2) returning *';
  try {
        const { rows } = await dbQuery.query(deleteResQuery, [rid, decoded.uid]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'You have no reservations with that id';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = {};
        successMessage.data.message = 'Reservation deleted successfully';
        return res.status(status.success).send(successMessage);
    } 
    catch (error) {
        return res.status(status.error).send(error);
  }
};


export {
    createReservation,
    getReservations,
    getLearnings,
    getTeachings,
    deleteReservation
};