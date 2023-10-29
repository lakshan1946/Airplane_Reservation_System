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

function PastFlightCard({ data }) {
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

function PastFlight() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [active, setActive] = useState(false);

  const handleFlightDataSubmit = async (e) => {
    e.preventDefault();
    // const flightData = await getFlightDataByRoute(origin, destination);
    // console.log("Flight data for", origin, "to", destination, ":", flightData);
  };
  return (
    <div className="bg-info m-5 p-2">
      <div className="m-5">
        <form onSubmit={handleFlightDataSubmit} className="mb-3">
          <div className="form-group">
            <label htmlFor="origin">Origin:</label>
            <input
              type="text"
              className="form-control gray-background"
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
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
            Get Flight Data by Route
          </button>
        </form>
        {active && (
          <div>
            <div className="cards FlightCardMap">
              {<PastFlightCard data={data} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PastFlight;
