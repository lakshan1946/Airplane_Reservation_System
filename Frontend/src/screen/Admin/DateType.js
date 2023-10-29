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
function DateTypeCard({ data }) {
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
          {data.map((p) => (
            <tr>
              <td>{p.PID}</td>
              <td>{p.Fname}</td>
              <td>{p.Lname}</td>
              <td>{p.booking}</td>
            </tr>
          ))}
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
    console.log(startDate, endDate);
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
            {<DateTypeCard data={data} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default DateDestination;