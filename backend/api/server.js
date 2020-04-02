import express from 'express';
import cors from 'cors';
import env from './env';

import authRoute from './app/routes/authRoute';
import usersRoute from './app/routes/usersRoute';
import adminRoute from './app/routes/adminRoute';
import meetingRoute from './app/routes/meetingRoute';

const app = express();

app.use(cors());
// add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(express.urlencoded({ extended: false }));
// add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.json());

app.use('/api', authRoute);
app.use('/api', usersRoute);
app.use('/api', adminRoute);
app.use('/api', meetingRoute);

app.listen(env.port).on('listening', () => {
  console.log(`🚀 are live on ${env.port}`);
});

export default app;