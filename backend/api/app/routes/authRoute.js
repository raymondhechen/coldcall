import express from 'express';
import { getUser, addSkill, createUser, siginUser } from '../controllers/authController';

const router = express.Router();

// users Routes
router.post('/auth/signup', createUser);
router.post('/auth/addskill', addSkill);
router.post('/auth/signin', siginUser);
router.post('/auth/user', getUser);

export default router;