import express from 'express';
import { searchEmail, searchFirstnameOrLastname } from '../controllers/usersController';

const router = express.Router();

// users Routes
router.get('/users/emails', searchEmail);
router.get('/users/names', searchFirstnameOrLastname);

export default router;