import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { loginUser } from './database.js'; // Adjust the path as needed

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;


app.use(bodyParser.json());


// Define your routes and handlers here
app.post('/login', (req, res) => {
  loginUser(req, res);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
