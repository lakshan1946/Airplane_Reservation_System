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
let temp="";
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
      } else {
        const passportID = results[0].Passport_ID;
        temp=passportID;
        return res.json({ success: true, message: 'User registered successfully' });
      }
    }); 
  };

  export const regprofileuser = (req, res) => {

    
    console.log("Has")
    const sql = "SELECT `Passport_ID`, `UserName`, `First_Name`, `Last_Name`, `Phone_No`, `email`, `gender`, `Address_Line_01`, `Address_Line_02`, `City`, `Country`, `No_of_bookings`, `Membership_status` FROM `registered_user` WHERE `Passport_ID` = ?";
    const val=[temp]
    console.log(temp)
    db.query(sql, val, (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: 'Error querying the database' });
      } else if (results.length === 0) {
        // Alert when username and password do not match
        console.log("username and password do not match")
        res.status(401).json({ message: 'Username and password do not match' });
      } else {
        console.log(results[0])
        return res.json({ message: results[0]});
      }
    }); 
    
    
  };

  export const guestUser = (userData, callback) => {
    const data = userData.body;
    console.log(data)
  
    try {
            db.execute('CALL Add_Visiting_User(?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            data.passportID,
            data.firstName,
            data.lastName,
            data.phone,
            data.dateOfBirth,
            data.line,
            data.country,
            data.email,
            data.gender
        ]);

        // Registration was successful, so return a success response
        return callback.json({ success: true, message: 'User registered successfully' });

    } catch (err) {
        console.error('Error registering user:', err);
        // Check if the callback is a function before calling it
        if (typeof callback === 'function') {
            callback(err, null);
        } else {
            console.error('Callback is not a function.');
        }
    }
};


  export const registerUser =  (userData, callback) => {
    const data = userData.body;
    console.log(data);
  
    try {
       db.execute('CALL User_Register(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        data.passportID,
        data.username,
        data.password,
        data.firstName,
        data.lastName,
        data.phone,
        data.gender,
        data.email,
        data.dateOfBirth,
        data.line1,
        data.line2,
        data.city,
        data.country
      ]);
      
      // Registration was successful, so return a success response
      return callback.json({ success: true, message: 'User registered successfully' });
  
    } catch (err) {
      console.error('Error registering user:', err);
      // Check if the callback is a function before calling it
      if (typeof callback === 'function') {
        callback(err, null);
      } else {
        console.error('Callback is not a function.');
      }
    }
  };

  export const age_constr = (userData, callback) => {
    const data = userData.body;
  
    // Assign below_18 based on the condition

    let below_18;

    if (data.age === 'below') {
      below_18 = 1;
    } else {
      below_18 = 0;
    }



  
    const sql = 'CALL FUNCTION_1(?, ?)';
    const val = [data.flightNo, below_18];
 // Corrected variable name
    db.query(sql, val, (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: 'Error querying the database' });
      } else if (results.length === 0) {
        // Alert when username and password do not match
        console.log("username and password do not match");
        res.status(401).json({ message: 'Username and password do not match' });
      } else {
        console.log(results[0]);
        return callback.json({ message: results[0] });
      }
    });
  }
  