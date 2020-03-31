import express from 'express';
import { createUser, siginUser } from '../controllers/authController';

const router = express.Router();

// users Routes
router.post('/auth/signup', createUser);
router.post('/auth/signin', siginUser);

export default router;