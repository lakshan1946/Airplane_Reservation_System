import mysql from 'mysql2';
import dotenv from "dotenv";
dotenv.config();


const db = mysql.createConnection({
    host: process.env.MYSQL_HOST, //local host name
    user: process.env.MYSQL_USER, //username
    password: process.env.MYSQL_PASSWORD, // mysql password of your computer
    database: process.env.MYSQL_DATABASE, //database name
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

export const loginUser = (req, res) => {
    // API endpoint to check username and password and get Passport_ID
    const { values } = req.body; // Destructure the "values" object
    const { username, password } = values; // Destructure "username" and "password" from "values"

    if (!username || !password) {
    // Check if the username or password is missing
      return res.status(400).json({ message: 'Username and password are required' });
    // The following line will never be executed because the function has already returned
    }
    // Query to check the username and password
    const sql = 'SELECT Passport_ID FROM Registered_User WHERE UserName = ? AND Passcode = ?';
    const vals = [username, password];
    db.query(sql, vals, (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: 'Error querying the database' });
      } else if (results.length === 0) {
        // Alert when username and password do not match
        console.log("username and password do not match")
        res.status(401).json({ message: 'Username and password do not match' });
      } else {
        const passportID = results[0].Passport_ID;
        res.status(200).json({ Passport_ID: passportID });
        console.log(passportID)
      }
    }); 
  };
  

