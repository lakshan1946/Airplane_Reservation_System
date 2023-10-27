import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql
  .createConnection({
    host: process.env.MYSQL_HOST, //local host name
    user: process.env.MYSQL_USER, //username
    password: process.env.MYSQL_PASSWORD, // mysql password of your computer
    database: process.env.MYSQL_DATABASE, //database name
  })
  .promise();

export async function getFlightSchedule() {
  const [row] = await db.query(`
  select Flight_ID,origin,destination,Departure_Date_Time,Arrival_Date_Time
  from flight
  `);
  return row;
}
const flightData = await getFlightSchedule();
console.log(flightData);
