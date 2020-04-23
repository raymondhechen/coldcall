import moment from 'moment';
import dbQuery from '../db/dbQuery';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { hashPassword, comparePassword, isValidEmail, validatePassword, isEmpty, generateUserToken } from '../middlewares/validations';
import { errorMessage, successMessage, status } from '../middlewares/status';

dotenv.config();

/**
 * Get current user info
 * @param {object} req
 * @param {object} res
 * @returns {object} user info
 */
const getUser = async (req, res) => {
    const { token } = req.headers;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        
        const getSkillsQuery = 
        `
        SELECT skill_name FROM Users JOIN 
        (SELECT * FROM Skills JOIN HasSkill 
        ON Skills.sid = HasSkill.sid) AS C 
        ON Users.uid = C.uid 
        WHERE email = $1
        `;
        const { rows } = await dbQuery.query(getSkillsQuery, [decoded.email]);
        const skills = [];
        var i;
        for (i = 0; i < rows.length; i++) {
            skills.push(rows[i].skill_name);
        }
        console.log(skills)
        const values = [decoded.uid, decoded.email, decoded.first_name, decoded.last_name, skills]; // store in list
        successMessage.data = values;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
    }
};

/**
 * Add skill to user
 * @param {object} req
 * @param {object} res
 * @returns {object} user info
 */
const addSkill = async (req, res) => {
    const { token } = req.headers;
    const { topic, skill } = req.body;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        
        const insertSkill = 
        `
        INSERT INTO 
        Skills(topic, skill_name)
        VALUES($1,$2)
        ON CONFLICT (topic, skill_name) DO UPDATE SET sid = EXCLUDED.sid
        RETURNING sid
        `
        const { rows } = await dbQuery.query(insertSkill, [topic, skill.toLowerCase()]);
        var skillID = rows[0].sid
        
        const insertHasSkill = 
        `
        INSERT INTO 
        HasSkill(uid, sid)
        VALUES($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING *
        `
        // Insert new skill into HasSkill table
        await dbQuery.query(insertHasSkill, [decoded.uid, skillID]);
        return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
    }
};

/**
 * delete skill from user
 * @param {object} req
 * @param {object} res
 * @returns {object} user info
 */
const deleteSkill = async (req, res) => {
    const { token } = req.headers;
    const { topic, skill } = req.body;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);    
        const deleteHasSkill = 
        `
        DELETE FROM HasSkill 
        WHERE uid = $1 AND sid = (SELECT sid
        FROM Skills
        WHERE topic = $2 AND skill_name = $3)
        RETURNING *
        `
        // Delete skill into HasSkill table
        await dbQuery.query(deleteHasSkill, [decoded.uid, topic, skill.toLowerCase()]);
        return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
    }
};

/**
 * Signup: create a user
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const createUser = async (req, res) => {
    const { email, first_name, last_name, password } = req.body; // request body
    const created_on = moment(new Date()); // new date
    
    // info check
    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
        errorMessage.error = 'Email, password, first name, and last name field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMessage);
    }
    if (!validatePassword(password)) {
        errorMessage.error = 'Password must be more than 5 characters';
        return res.status(status.bad).send(errorMessage);
    }

    const hashedPassword = hashPassword(password); // hash password
    // sql query
    const createUserQuery = 
        `
        INSERT INTO
        users(email, first_name, last_name, password, created)
        VALUES($1, $2, $3, $4, $5)
        returning *
        `;
    const values = [ email, first_name, last_name, hashedPassword, created_on]; // store in list

    try {
        console.log("User Added");
        const { rows } = await dbQuery.query(createUserQuery, values);
        const dbResponse = rows[0];
        console.log(dbResponse);
        delete dbResponse.password;
        const token = generateUserToken(dbResponse.uid, dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        console.log("success");
        return res.status(status.created).send(successMessage);
    } 
    catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that EMAIL already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
const siginUser = async (req, res) => {
    const { email, password } = req.body;
    // info check
    if (isEmpty(email) || isEmpty(password)) {
        errorMessage.error = 'Email or Password detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email) || !validatePassword(password)) {
        errorMessage.error = 'Please enter a valid Email or Password';
        return res.status(status.bad).send(errorMessage);
    }

    const signinUserQuery = 'SELECT * FROM users WHERE email = $1'; // query
    try {
        const { rows } = await dbQuery.query(signinUserQuery, [email]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }
        if (!comparePassword(dbResponse.password, password)) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }
        const token = generateUserToken(dbResponse.uid, dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);
    } 
    catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

export { getUser, addSkill, deleteSkill, createUser, siginUser };