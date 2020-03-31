import moment from 'moment';
import dbQuery from '../db/dbQuery';
import { empty } from '../middlewares/validations';
import { errorMessage, successMessage, status } from '../middlewares/status';

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
    const { uid } = req.user;
    const getReservationsQuery = 'SELECT * FROM Reservations WHERE student_id = $1 OR teacher_id = $1 ORDER BY start_time ASC';
    
    try {
        const { rows } = await dbQuery.query(getReservationsQuery, [uid]);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            errorMessage.error = 'No reservations';
            return res.status(status.notfound).send(errorMessage);
        }
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
    const { uid } = req.user;
    const getReservationsQuery = 'SELECT * FROM Reservations WHERE student_id = $1 ORDER BY start_time ASC';
    
    try {
        const { rows } = await dbQuery.query(getReservationsQuery, [uid]);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            errorMessage.error = 'No learnings';
            return res.status(status.notfound).send(errorMessage);
        }
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
    const { uid } = req.user;
    const getReservationsQuery = 'SELECT * FROM Reservations WHERE teacher_id = $1 ORDER BY start_time ASC';
    
    try {
        const { rows } = await dbQuery.query(getReservationsQuery, [uid]);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            errorMessage.error = 'No teachings';
            return res.status(status.notfound).send(errorMessage);
        }
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