import React from "react";
import { useState } from "react";
import axios from "axios";

let datas

function TotalRevenueCard({ data }) {
  return (
    <div className="card-body">
      <table className="">
        <tbody>
          <tr>
            <th>Model</th>
            <th>Revenue</th>
          </tr>
          {data && data.map((p) => (
            <tr>
              <td>{p.model}</td>
              <td>{p.Revenue}</td>
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
    const data = {
      model: aircraftType
    };
    try {
      const response = await axios.post("/revenue", data);
      // Handle the response from the backend as needed
      datas=response.data.message
      console.log(datas)
      // Set active to true to display the result
      setActive(true);
    } catch (error) {
      console.error("Error while making the request:", error);
    }
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
              {<TotalRevenueCard data={datas} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Revenue;
