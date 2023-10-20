import pool from "./config/db.js";
import {ymd, ymdhms} from "./helpers/dateTimeFormat.js";

export async function getFlightSchedule() {
  const [row] = await pool.query(`
  select Flight_ID, origin as Origin, destination as Destination, Departure_Date_Time, Arrival_Date_Time
  from flight
  `);
  return row;
}
// const flightData = await getFlightSchedule();
// console.log(flightData);

export async function getFlight(dDate, Origin, Destination) {
  try {
    const Date1 = ymd(new Date(dDate))
    const [rows] = await pool.query(`
    call get_flights(?,?,?)`,
      [Date1, Origin, Destination]
    );
    rows[0].forEach(element => {
      element.Departure_Date_Time = ymdhms(new Date(element.Departure_Date_Time))});
    return rows[0];}
  catch (error) {
    console.error('There is and error', error);}
}

const flight = await getFlight('2023-10-21', 'BOM', 'CGK')
console.log(flight);

export async function insertFlight(Origin, Destination, Departure_Date_Time, Arrival_Date_Time, plane_ID) {
  const result = await pool.query(
    `
  insert into flight(origin,destination,Departure_Date_Time,Arrival_Date_Time,plane_ID)
  values(?,?,?,?,?)`,
    [Origin, Destination, Departure_Date_Time, Arrival_Date_Time, plane_ID]
  );
  return result;
}

export async function getFlightDetails(Flight_ID) {
  const [row] = await pool.query(
    `
  select
  Flight_ID, origin as Origin, destination as Destination, Departure_Date_Time, Arrival_Date_Time 
  from flight
  where Flight_ID = ?`,
    [Flight_ID]
  );
  return row[0];
}

// const flightData = await getFlightDetails(6);
// console.log(flightData);

export async function getAirplanes() {
  const [row] = await pool.query("select * from airplane");
  return row;
}

const result = await getAirplanes();
console.log(result);

export async function getAirplane(plane_ID) {
  const [row] = await pool.query(
    `
  select * 
  from airplane
  where plane_ID = ?`,
    [plane_ID]
  );
  return row[0];
}

export async function createUser(Passport_ID, User_type) {
  const result = await pool.query(
    `
  insert into user(Passport_ID,User_type)
  values(?,?)`,
    [Passport_ID, User_type]
  );
  return result;
}

//const result = await createUser("PassportID5", "Guest");
//console.log(result);
//const airplane = await getAirplane(100);
//console.log(airplane);
