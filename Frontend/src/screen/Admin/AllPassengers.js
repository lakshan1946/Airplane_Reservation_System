import React from "react";
import { useState } from "react";
import axios from "axios";

let datas

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
          {data && data.map((p) => (
            <tr>
              <td>{p.Passport_ID}</td>
              <td>{p.First_Name}</td>
              <td>{p.Last_Name}</td>
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
    
    // Create a data object with flightNo and age
    const data = {
      flightNo: flightNo,
      age: age,
    };

    // Make a POST request to your backend API with the data
    try {
      const response = await axios.post("/age_constraint", data);
      // Handle the response from the backend as needed
      datas=response.data.message
      console.log(datas)
      // Set active to true to display the result
      setActive(true);
    } catch (error) {
      console.error("Error while making the request:", error);
    }
  }

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
                {<AgePassengerCard data={datas} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllPasenger;



