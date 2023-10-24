import express from 'express';
import mysql from 'mysql2/promise'; // Use the promise-based version
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json()); // Use JSON body parser

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

(async () => {
  try {
    await db.connect();
    console.log('Connected to MySQL database');
  } catch (err) {
    console.error('MySQL connection error:', err);
  }
})();

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const [rows] = await db.execute(
      'SELECT Passport_ID FROM Registered_User WHERE UserName = ? AND Passcode = ?',
      [username, password]
    );

    if (rows.length === 0) {
      console.log('Username and password do not match');
      res.status(401).json({ message: 'Username and password do not match' });
    } else {
      const passportID = rows[0].Passport_ID;
      res.status(200).json({ Passport_ID: passportID });
      console.log(passportID);
    }
  } catch (err) {
    console.error('Error querying the database:', err);
    res.status(500).json({ message: 'Error querying the database' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
