import express from 'express';
import { searchEmail, searchFirstnameOrLastname, searchTopic, searchSkill } from '../controllers/usersController';

const router = express.Router();

// users Routes
router.get('/users/email', searchEmail);
router.get('/users/name', searchFirstnameOrLastname);
router.get('/users/topic', searchTopic);
router.get('/users/skill', searchSkill);

export default router;