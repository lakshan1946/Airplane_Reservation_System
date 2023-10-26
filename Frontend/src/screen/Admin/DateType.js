import React from "react";
import { useState } from "react";

const data = [
  {
    PID: "123",
    Fname: "Lakshan",
    Lname: "Madhusanka",
    booking: "5",
  },
  {
    PID: "456",
    Fname: "dulitha",
    Lname: "herath",
    booking: "7",
  },
];
function DateDestinationCard(props) {
  return (
    <div className="card-body">
      <table className="">
        <tbody>
          <tr>
            <th>Passport ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>No of bookings</th>
          </tr>
          <tr>
            <td>{props.PID}</td>
            <td>{props.Fname}</td>
            <td>{props.Lname}</td>
            <td>{props.booking}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
function DateDestination() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [active, setActive] = useState(false);

  const handleBookingsSubmit = async (e) => {
    e.preventDefault();
    // const bookings = await getBookingsByPassengerType(startDate, endDate);
    // console.log("Bookings by passenger type:", bookings);
  };
  return (
    <div className="admincomp ">
      <form onSubmit={handleBookingsSubmit}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            className="form-control gray-background"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            className="form-control gray-background"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => setActive(true)}
        >
          Get Bookings by Passenger Type
        </button>
      </form>
      {active && (
        <div>
          <div className="cards FlightCardMap">
            {data.map((flight) => (
              <DateDestinationCard
                PID={flight.PID}
                Fname={flight.Fname}
                Lname={flight.Lname}
                booking={flight.booking}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DateDestination;
