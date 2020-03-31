import dbQuery from '../db/dbQuery';
import { errorMessage, successMessage, status } from '../middlewares/status';

/**
 * @params {Object} req
 * @params {Object} res
 * @returns return email
 */ 
const searchEmail = async (req, res) => {
    const { email } = req.query;
    const searchQuery = 'SELECT * from users WHERE email = $1 ORDER BY id DESC';
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
 * @params {Object} req
 * @params {Object} res
 * @returns return firstname and Lastname
 */ 

const searchFirstnameOrLastname = async (req, res) => {
    const { first_name, last_name } = req.query;
    const searchQuery = 'SELECT * FROM users WHERE first_name = $1 OR last_name = $2 ORDER BY id DESC';

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

export { searchEmail, searchFirstnameOrLastname };