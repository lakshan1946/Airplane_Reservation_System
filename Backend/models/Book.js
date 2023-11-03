import e from "cors";
import pool from "../config/db.js";
import { ymdhms } from "../helpers/dateTimeFormat.js";

class Book {
  static async reserve(Passport_ID, Flight_ID, Seat_No, Class, User_Type) {
    const [result] = await pool.query(`call Reserve(?,?,?,?,?)`, [
      Passport_ID,
      Flight_ID,
      Seat_No,
      Class,
      User_Type,
    ]);
    return result[0];
  }

  static async get_userpassport(username) {
    const [result] = await pool.query(
      `select Passport_ID from registered_user
            where UserName = ?`,
      [username]
    );
    return result;
  }

  static async get_guestpassport(guestid) {
    const [result] = await pool.query(
      `select Passport_ID from visiting_user
            where Passport_ID = ?`,
      [guestid]
    );
    return result;
  }

  static async get_usertype(Reserve_ID) {
    const [result] = await pool.query(
      `select Passenger_Type from reserve
            where Reserve_ID = ?`,
      [Reserve_ID]
    );
    return result;
  }

  static async get_reservationdetails(Reserve_ID) {
    const [result] = await pool.query(
      `select rs.Reserve_ID, fl.Flight_Name, ap.model as Airplane, rs.Class, rs.Seat_No, fl.Departure_Date_Time, fl.Arrival_Date_Time,
            fl.origin, apo.Airport_name as origin_airport, lco.location_Name as origin_country, fl.destination,
            apd.Airport_name as destination_airport, lcd.location_Name as destination_country, rs.Passport_ID,
            ru.First_Name, ru.Last_Name, ru.email, rs.Price, rs.Final_Price, rs.Reserved as Reserved_Date_Time
            from reserve rs
            inner join flight fl on fl.Flight_ID = rs.Flight_ID
            inner join airport apo on apo.Airport_code = fl.origin
            inner join location lco on lco.Location_ID = apo.Location_ID
            inner join airport apd on apd.Airport_code = fl.destination
            inner join location lcd on lcd.Location_ID = apd.Location_ID
            inner join registered_user ru on ru.Passport_ID = rs.Passport_ID
            inner join airplane ap on ap.Plane_ID = fl.Plane_ID
            where rs.Reserve_ID = ?`,
      [Reserve_ID]
    );
    result.forEach((element) => {
      element.Departure_Date_Time = ymdhms(
        new Date(element.Departure_Date_Time)
      );
      element.Arrival_Date_Time = ymdhms(new Date(element.Arrival_Date_Time));
      element.Reserved_Date_Time = ymdhms(new Date(element.Reserved_Date_Time));
    });
    return result;
  }

  static async get_guestreservationdetails(Reserve_ID) {
    const [result] = await pool.query(
      `select rs.Reserve_ID, fl.Flight_Name, ap.model as Airplane, rs.Class, rs.Seat_No, fl.Departure_Date_Time, fl.Arrival_Date_Time,
            fl.origin, apo.Airport_name as origin_airport, lco.location_Name as origin_country, fl.destination,
            apd.Airport_name as destination_airport, lcd.location_Name as destination_country, rs.Passport_ID,
            gu.First_Name, gu.Last_Name, gu.Address, rs.Price, rs.Final_Price, rs.Reserved as Reserved_Date_Time
            from reserve rs
            inner join flight fl on fl.Flight_ID = rs.Flight_ID
            inner join airport apo on apo.Airport_code = fl.origin
            inner join location lco on lco.Location_ID = apo.Location_ID
            inner join airport apd on apd.Airport_code = fl.destination
            inner join location lcd on lcd.Location_ID = apd.Location_ID
            inner join visiting_user gu on gu.Passport_ID = rs.Passport_ID
            inner join airplane ap on ap.Plane_ID = fl.Plane_ID
            where rs.Reserve_ID = ?`,
      [Reserve_ID]
    );
    result.forEach((element) => {
      element.Departure_Date_Time = ymdhms(
        new Date(element.Departure_Date_Time)
      );
      element.Arrival_Date_Time = ymdhms(new Date(element.Arrival_Date_Time));
      element.Reserved_Date_Time = ymdhms(new Date(element.Reserved_Date_Time));
    });
    return result;
  }
}

export default Book;
