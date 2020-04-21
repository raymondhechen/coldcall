import dbQuery from '../db/dbQuery';
import { errorMessage, successMessage, status } from '../middlewares/status';

/**
 * Get all users
 * @params {Object} req
 * @params {Object} res
 * @returns users
 */ 
const getUsers = async (req, res) => {
    const searchQuery = 'SELECT * from users ORDER BY last_name DESC';
    try {
        const { rows } = await dbQuery.query(searchQuery);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No users';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    }
    catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Search by email address
 * @params {Object} req
 * @params {Object} res
 * @returns users with email
 */ 
const searchEmail = async (req, res) => {
    const { email } = req.query;
    const searchQuery = 'SELECT * from users WHERE email = $1 ORDER BY last_name DESC';
    try {
        const { rows } = await dbQuery.query(searchQuery, [email]);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No user with such email';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    }
    catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Search by first name and last name
 * @params {Object} req
 * @params {Object} res
 * @returns users with first name or last name
 */ 
const searchFirstnameOrLastname = async (req, res) => {
    const { first_name, last_name } = req.query;
    const searchQuery = 'SELECT * FROM users WHERE first_name = $1 OR last_name = $2 ORDER BY last_name DESC';

    try {
        const { rows } = await dbQuery.query(searchQuery, [first_name, last_name]);
        const dbResponse = rows;

        if (!dbResponse[0]) {
            errorMessage.error = 'No user with such names';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    }
    catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Search by topics
 * @params {Object} req
 * @params {Object} res
 * @returns users with topics
 */ 
const searchTopic = async (req, res) => {
    const { topic } = req.query;
    const searchQuery = 'SELECT * FROM Users as u JOIN HasSkill as h ON u.uid = h.uid JOIN Skills as s ON h.sid = s.sid WHERE s.topic = $1 ORDER BY last_name DESC';
    try {
        const { rows } = await dbQuery.query(searchQuery, [topic]);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No user with such topic';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    }
    catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Search by skills
 * @params {Object} req
 * @params {Object} res
 * @returns users with skills
 */ 
const searchSkill = async (req, res) => {
    const { skill } = req.query;
    const searchQuery = 'SELECT * FROM Users as u JOIN HasSkill as h ON u.uid = h.uid JOIN Skills as s ON h.sid = s.sid WHERE s.skill_name = $1 ORDER BY last_name DESC';
    try {
        const { rows } = await dbQuery.query(searchQuery, [skill]);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No user with such skill';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    }
    catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

export { getUsers, searchEmail, searchFirstnameOrLastname, searchTopic, searchSkill };