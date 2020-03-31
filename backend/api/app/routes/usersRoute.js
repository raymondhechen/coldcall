import express from 'express';
import { createUser, siginUser, searchEmail, searchFirstnameOrLastname } from '../controllers/usersController';

const router = express.Router();

// users Routes
router.post('/auth/signup', createUser);
router.post('/auth/signin', siginUser);
router.get('/users/emails', searchEmail);
router.get('/users/names', searchFirstnameOrLastname);

export default router;