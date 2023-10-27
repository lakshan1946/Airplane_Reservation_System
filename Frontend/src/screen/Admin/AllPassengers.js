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

function AgePassengerCard({ data }) {
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

function AllPasenger() {
  const [flightNo, setFlightNo] = useState("");
  const [age, setAge] = useState("");
  const [active, setActive] = useState(false);

  const handleFlightNoSubmit = async (e) => {
    e.preventDefault();
    // const passengers = await getPassengersByFlight(flightNo);
    // console.log("Passengers below 18:", passengers.below18);
    // console.log("Passengers above 18:", passengers.above18);
  };
  return (
    <div className="background">
      <div className="bg-info m-4 p-2">
        <div className="m-5">
          <form onSubmit={handleFlightNoSubmit} className="mb-3">
            <div className="form-group">
              <label htmlFor="flightNo">Flight No:</label>
              <input
                type="text"
                className="form-control gray-background"
                id="flightNo"
                value={flightNo}
                onChange={(e) => setFlightNo(e.target.value)}
              />
            </div>

            <div className="col">
              <label className="nameInfo">Gender</label>
              <select
                className="form-select"
                id="specificSizeSelect"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="">Select age</option>
                <option value="below">All</option>
                <option value="above">Above 18</option>
                <option value="below">Below 18</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={setActive}
            >
              Get Passengers by Flight
            </button>
          </form>
          {active && (
            <div>
              <div className="cards FlightCardMap">
                {<AgePassengerCard data={data} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllPasenger;
