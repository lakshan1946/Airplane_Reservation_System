import React from "react";
import { useState } from "react";
import axios from "axios"; 
// Import Axios for making HTTP requests

let datas

function DateDestinationCard({ data }) {
  return (
    <div className="card-body">
      <table className="">
        <tbody>
          <tr>
            <th>Count</th>
          </tr>
          {data && data.map((p) => (
            <tr>
              <td>{p.Count}</td>
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
    const data = {
      startDate: startDate,
      endDate: endDate,
      destination:destination
    };
    try {
      const response = await axios.post("/date_destination", data);
      // Handle the response from the backend as needed
      datas=response.data.count
      console.log([datas])
      // Set active to true to display the result
      setActive(true);
    } catch (error) {
      console.error("Error while making the request:", error);
    }
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
              {<DateDestinationCard data={datas} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DateDestination;
