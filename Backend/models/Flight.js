import pool from "../config/db"
import { ymdhms } from "../helpers/dateTimeFormat"

class Flight {
    static async insertFlight(Origin, Destination, Departure_Date_Time, Arrival_Date_Time, plane_ID, Base_price) {
        const dDate = ymdhms(new Date(Departure_Date_Time))
        const aDate = ymdhms(new Date(Arrival_Date_Time))
        const [result] = await pool.query(`
        call InsertFlight(?,?,?,?,?,?)`,
            [plane_ID, dDate, aDate, Origin, Destination, Base_price])
        return result
    }

    static async getFlights(Origin, Destination, Departure_Date) {
        const Date1 = ymd(new Date(Departure_Date))
        const [flights] = await pool.query(`
        call get_flights(?,?,?)`,
            [Date1, Origin, Destination]
        );
        
        flights[0].forEach(element => {
        element.Departure_Date_Time = ymdhms(new Date(element.Departure_Date_Time))
        });
        return flights[0];
    }

    static async getFlightSchedule() {
        const [row] = await pool.query(`
        select Flight_ID, origin as Origin, destination as Destination, Departure_Date_Time, Arrival_Date_Time
        from flight
        `);

        row.forEach(element => {
            element.Departure_Date_Time = ymdhms(new Date(element.Departure_Date_Time))
            element.Arrival_Date_Time = ymdhms(new Date(element.Arrival_Date_Time))
        })
        return row;
    }

    static async getFlightDetails(Flight_ID) {
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
}

export default Flight;