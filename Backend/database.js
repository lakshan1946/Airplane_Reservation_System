import pool from "./config/db.js";
import {ymd, ymdhms} from "./helpers/dateTimeFormat.js";
import Flight from "./models/Flight.js";


export async function getAirplanes() {
  const [row] = await pool.query("select * from airplane");
  return row;
}

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

// const result = await Flight.getPlane(10);
// console.log(result);