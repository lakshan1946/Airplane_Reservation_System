import React from "react";
import { useState } from "react";

const data = [
  {
    Model: "123",
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

function TotalRevenueCard({ data }) {
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

function Revenue() {
  const [aircraftType, setAircraftType] = useState("");
  const [active, setActive] = useState(false);

  const handleRevenueSubmit = async (e) => {
    e.preventDefault();
    // const passengers = await getPassengersByDestination(startDate, endDate, destination);
    // console.log("Passengers travelling to", destination, ":", passengers);
  };
  return (
    <div className="bg-info m-5 p-2">
      <div className="m-5">
        <form onSubmit={handleRevenueSubmit} className="mb-3">
          <div className="form-group">
            <label htmlFor="origin">Aircraft type</label>
            <input
              type="text"
              className="form-control gray-background"
              id="origin"
              value={aircraftType}
              onChange={(e) => setAircraftType(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={setActive}>
            Get Total revenue by Aircraft type
          </button>
        </form>
        {active && (
          <div>
            <div className="cards FlightCardMap">
              {<TotalRevenueCard data={data} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Revenue;
