import React from "react";
import { useState } from "react";
import axios from "axios";

let datas;

function AgePassengerCard({ data }) {
  return (
    <div className="card-body admintable">
      <div className="admintablesub">
        <table className="admint ">
          <tbody>
            <thead>
              <tr>
                <th className="adminth">Passport ID</th>
                <th className="adminth">First Name</th>
                <th className="adminth">Last Name</th>
                <th className="adminth">Age</th>
              </tr>
            </thead>
            {data &&
              data.map((p) => (
                <tr>
                  <td className="admincol">{p.Passport_ID}</td>
                  <td className="admincol">{p.First_Name}</td>
                  <td className="admincol">{p.Last_Name}</td>
                  <td className="admincol">{p.Age}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
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
    console.log(age);

    // Make a POST request to your backend API with the data
    try {
      const response = await axios.post("/age_constraint", data);
      // Handle the response from the backend as needed
      datas = response.data.message;
      console.log(datas);
      // Set active to true to display the result
      setActive(true);
    } catch (error) {
      console.error("Error while making the request:", error);
    }
  };

  return (
    <div className="backgroundAdmin">
      <h1 className="adminTitle">View Passengers by age</h1>
      <div id="adminCont">
        <div className="admincomp">
          <form onSubmit={handleFlightNoSubmit} className="">
            <div className="form-group">
              <label htmlFor="flightNo" className="adminselect">
                Flight No:
              </label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Enter Flight no"
                id="flightNo"
                value={flightNo}
                onChange={(e) => setFlightNo(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="nameInfo adminselect">Age range:</label>
              <select
                className="form-select"
                id="specificSizeSelect"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="">Select age</option>
                <option value="All">All</option>
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
