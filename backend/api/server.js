import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';

import usersRoute from './app/routes/usersRoute';
import adminRoute from './app/routes/adminRoute';
import tripRoute from './app/routes/tripRoute';
import busRoute from './app/routes/busRoute';
import bookingRoute from './app/routes/bookingRoute';

const app = express();

app.use(cors());
// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(express.urlencoded({ extended: false }));
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.json());

app.use('/api', usersRoute);
app.use('/api', adminRoute);
app.use('/api', tripRoute);
app.use('/api', busRoute);
app.use('/api', bookingRoute);

app.listen(env.port).on('listening', () => {
  console.log(`🚀 are live on ${env.port}`);
});

export default app;