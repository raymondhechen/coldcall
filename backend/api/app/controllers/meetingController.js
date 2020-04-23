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
    const { teacher_id, start_time, end_time, sid, lid } = req.body;
    const { uid } = req.user;
    const created_on = moment(new Date());

    if (empty(student_id) || empty(teacher_id) || empty(start_time) || empty(end_time)) {
        errorMessage.error = 'Missing information';
        return res.status(status.bad).send(errorMessage);
    }
    
    const createReservationQuery = 
    `
        INSERT INTO
        Reservations(student_id, teacher_id, start_time, end_time, sid, lid, finished, time_created)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        returning *
    `;
    const values = [
        uid,
        teacher_id,
        start_time, 
        end_time, 
        sid, 
        lid,
        0, 
        created_on
    ];

    try {
        const { rows } = await dbQuery.query(createReservationQuery, values);
        const dbResponse = rows[0];
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    } 
    catch (error) {
        errorMessage.error = 'Unable to create booking';
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
 * Delete learning reservation
 * @param {object} req 
 * @param {object} res 
 * @returns {void} return response booking deleted successfully
 */
const deleteLearning = async (req, res) => {
  const { rid } = req.params;
  const { uid } = req.user;
  const deleteLearningQuery = 'DELETE FROM Reservations WHERE rid = $1 AND student_id = $2 returning *';
  try {
        const { rows } = await dbQuery.query(deleteLearningQuery, [rid, uid]);
        const dbResponse = rows[0];
        if (!dbResponse) {
        errorMessage.error = 'You have no learnings with that id';
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

/**
 * Delete teaching reservation
 * @param {object} req 
 * @param {object} res 
 * @returns {void} return response booking deleted successfully
 */
const deleteTeaching = async (req, res) => {
    const { rid } = req.params;
    const { uid } = req.user;
    const deleteTeachingQuery = 'DELETE FROM Reservations WHERE rid = $1 AND teacher_id = $2 returning *';
    try {
        const { rows } = await dbQuery.query(deleteTeachingQuery, [rid, uid]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'You have no teachings with that id';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = {};
        successMessage.data.message = 'Reservation deleted successfully';
        return res.status(status.success).send(successMessage);
    } catch (error) {
        return res.status(status.error).send(error);
    }
};


export {
    createReservation,
    getReservations,
    getLearnings,
    getTeachings,
    deleteLearning,
    deleteTeaching
};