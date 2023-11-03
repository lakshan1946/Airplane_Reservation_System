import Flight from "../models/Flight.js";
import Book from "../models/Book.js";

class BookingService {
  static async get_flights(flightData, callback) {
    const data = flightData.body;

    try {
      const [result] = await Flight.getFlights(
        data.origin,
        data.destination,
        data.dDate
      );
      return callback.json(result);
    } catch (err) {
      console.error(err);
    }
  }

  static async get_plane(Flight_ID, callback) {
    try {
      const result = await Flight.getPlane(Flight_ID);
      return callback.json(result);
    } catch (err) {
      console.error(err);
    }
  }

  static async reserve_seat(Details, callback) {
    const seatdata = await this.seat_decoder(Details[0]);
    const userdata = await this.user_decorder(Details[1]);
    const seat_No = seatdata[0];
    const Class = seatdata[1];
    const Passport_ID = userdata[0];
    const usertype = userdata[1];
    const flight_ID = Details[2];

    try {
      const result = await Book.reserve(
        Passport_ID,
        flight_ID,
        seat_No,
        Class,
        usertype
      );
      return callback.json(result);
    } catch (err) {
      console.error(err);
    }
  }

  static async seat_decoder(details) {
    const Arr = details.split("");
    if (Arr.length == 4) {
      Arr[0] = Arr[0].concat(Arr[1]);
      Arr[1] = Arr[2];
      Arr[2] = Arr[3];
    }
    let Seat_No;
    let Class;
    let a = parseInt(Arr[0]) - 1;
    let b = parseInt(Arr[2]);
    if (Arr[1] == "E") {
      Seat_No = a * 6 + b;
      Class = "Economy";
    } else {
      Seat_No = a * 4 + b;
      if (Arr[1] == "B") {
        Class = "Business";
      } else if (Arr[1] == "P") {
        Class = "Platinum";
      }
    }
    return [Seat_No, Class];
  }

  static async user_decorder(details) {
    const type = details.slice(0, 1);
    const username = details.slice(1, details.length);
    let usertype;
    let Passport_ID;
    if (type == "r") {
      usertype = "Registered";
      Passport_ID = await Book.get_userpassport(username);
      console.log(Passport_ID);
    } else {
      usertype = "Guest";
      Passport_ID = await Book.get_guestpassport(username);
    }
    return [Passport_ID[0].Passport_ID, usertype];
  }

  static async find_reservationdetails(Reserve_ID, callback) {
    console.log("sasa", Reserve_ID);
    const usertype = await this.find_usertype(Reserve_ID);

    try {
      if (usertype == "G") {
        const [result] = await Book.get_guestreservationdetails(Reserve_ID);
        return callback.json(result);
      } else {
        const [result] = await Book.get_reservationdetails(Reserve_ID);
        return callback.json(result);
      }
    } catch (err) {
      console.error(err);
      return callback.json(err);
    }
  }

  static async find_usertype(Reserve_ID) {
    const type = await Book.get_usertype(Reserve_ID);
    const ptype = type[0].Passenger_Type;
    if (ptype == "Guest") {
      return "G";
    } else {
      return "R";
    }
  }
}

export default BookingService;
