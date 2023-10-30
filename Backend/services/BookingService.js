import Flight from "../models/Flight.js";

class BookingService {
    static async get_flights(flightData, callback) {
        const data = flightData.body;

        try {
            const [result] = await Flight.getFlights(data.origin, data.destination, data.dDate);
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
}

export default BookingService;