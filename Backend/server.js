import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { loginUser } from './database.js'; // Adjust the path as needed
import { registerUser } from './database.js'; // Adjust the path as needed
import { regprofileuser } from './database.js';
import { guestUser } from './database.js';
import { age_constr } from './database.js';
import { date_desti } from './database.js';
import { dateType } from './database.js';
import { pastFlight } from './database.js';
import { revenue_ } from './database.js';

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.use(bodyParser.json());


// Define your routes and handlers here
app.post('/login', (req, res, next) => {
  loginUser(req, res);
});

app.post('/past_flight', (req, res) => {
  pastFlight(req, res);
});

app.post('/register', (req, res) => {
  registerUser(req, res);
});

app.post('/booking', (req, res) => {
  registerUser(req, res);
});

app.post('/reguserprofile', (req, res) => {
  regprofileuser(req, res);
});

app.post('/age_constraint', (req, res) => {
  age_constr(req, res);
});

app.post('/date_destination', (req, res) => {
  date_desti(req, res);
});

app.post('/guest', (req, res) => {
  guestUser(req, res);
});
app.post('/date_type', (req, res) => {
  dateType(req, res);
});

app.post('/revenue', (req, res) => {
  revenue_(req, res);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
