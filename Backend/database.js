import mysql from 'mysql2';
import dotenv from "dotenv";
import bcrypt, { hash } from 'bcrypt';
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
export const loginUser = async (req, res) => {
    // API endpoint to check username and password and get Passport_ID
    const { values } = req.body; // Destructure the "values" object
    const { username, password } = values; // Destructure "username" and "password" from "values"

    if (!username || !password) {
    // Check if the username or password is missing
      return res.status(400).json({ message: 'Username and password are required' });
    // The following line will never be executed because the function has already returned
    }
    // Query to check the username and password
    const sql = 'SELECT * FROM Registered_User WHERE UserName = ?';
    const vals = [username];
    db.query(sql, vals, async (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: 'Error querying the database' });
      } else if (results.length === 0) {
        // Alert when username and password do not match
        console.log("username doesn't exist")
      } else {
        const passportID = results[0].Passport_ID;
        temp=passportID;
        const isValid=await bcrypt.compare(values.password,results[0].Passcode)
        if(isValid){
          return res.json({ success: true, message: 'User registered successfully' });
        }
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


  export const registerUser =  async (userData, callback) => {
    const data = userData.body;
    const  hashdata = await bcrypt.hash(data.password,10);
    try {
       await db.execute('CALL User_Register(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        data.passportID,
        data.username,
        hashdata,
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

  
    
    const sql = 'CALL FUNCTION_1(?, ?)';
    const val = [data.flightNo, data.age];
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
  
  export const date_desti = (userData, callback) => {
    const data = userData.body;
  
    // Assign below_18 based on the condition
    const sql = 'CALL FUNCTION_2(?, ?, ?)';
    const val = [data.startDate, data.endDate, data.destination];
    // Corrected variable name
    db.query(sql, val, (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        callback.status(500).json({ message: 'Error querying the database' });
      } else if (results.length === 0) {
        // Alert when username and password do not match
        console.log("username and password do not match");
        callback.status(401).json({ message: 'Username and password do not match' });
      } else {
        console.log(results[0]);
        return callback.json({ count: results[0]});
      }
    });
  }

  export const dateType = (userData, callback) => {
    const data = userData.body;
    
    const sql = 'CALL FUNCTION_3(?, ?)';
    const val = [data.startDate, data.endDate];
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

  export const pastFlight = (userData, callback) => {
    const data = userData.body;
    
    const sql = 'CALL FUNCTION_4(?, ?)';
    const val = [data.origin, data.destination];
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
  
  export const revenue_ = (userData, callback) => {
    const data = userData.body;
    
    const sql = 'CALL FUNCTION_5(?)';
    const val = [data.model];
 // Corrected variable name
    db.query(sql, val, (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        callback.status(500).json({ message: 'Error querying the database' });
      } else if (results.length === 0) {
        // Alert when username and password do not match
        console.log("username and password do not match");
        callback.status(401).json({ message: 'Username and password do not match' });
      } else {
        console.log(results[0]);
        return callback.json({ message: results[0] });
      }
    });
  }
  
  