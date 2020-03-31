import express from 'express';
import { createReservation, getReservations, getLearnings, getTeachings, deleteLearning, deleteTeaching } from '../controllers/meetingController';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

// bookings Routes

router.post('/reserve', verifyAuth, createReservation);
router.get('/reservations', verifyAuth, getReservations);
router.get('/learnings', verifyAuth, getLearnings);
router.get('/teachings', verifyAuth, getTeachings);
router.delete('/learnings/:rid', verifyAuth, deleteLearning);
router.delete('/teachings/:rid', verifyAuth, deleteTeaching);


export default router;