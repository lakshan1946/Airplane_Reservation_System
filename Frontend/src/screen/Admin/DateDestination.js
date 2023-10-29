import React from "react";
import { useState } from "react";

const data = [
  {
    PID: "123",
    Fname: "Lakshan",
    Lname: "Madhusanka",
    Age: "5",
  },
  {
    PID: "456",
    Fname: "dulitha",
    Lname: "herath",
    Age: "7",
  },
];

function DateDestinationCard({ data }) {
  return (
    <div className="card-body">
      <table className="">
        <tbody>
          <tr>
            <th>Passport ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
          {data.map((p) => (
            <tr>
              <td>{p.PID}</td>
              <td>{p.Fname}</td>
              <td>{p.Lname}</td>
              <td>{p.Age}</td>
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
  const [destination, setDestination] = useState("");
  const [active, setActive] = useState(false);

  const handleDestinationSubmit = async (e) => {
    e.preventDefault();
    // const passengers = await getPassengersByDestination(startDate, endDate, destination);
    // console.log("Passengers travelling to", destination, ":", passengers);
  };
  return (
    <div className="bg-info m-5 p-2">
      <div className="m-5">
        <form onSubmit={handleDestinationSubmit} className="mb-3">
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
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              className="form-control gray-background"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={setActive}>
            Get Passengers by Destination
          </button>
        </form>
        {active && (
          <div>
            <div className="cards FlightCardMap">
              {<DateDestinationCard data={data} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DateDestination;