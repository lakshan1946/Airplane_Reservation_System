import React from "react";
import { useState } from "react";
import axios from "axios";

let datas

function PastFlightCard({ data }) {
  return (
    <div className="card-body">
      <table className="">
        <tbody>
          <tr>
            <th>Flight ID</th>
            <th>Flight State</th>
            <th>Platinum Count</th>
            <th>Business Count</th>
            <th>Economy Count</th>
          </tr>
          {data && data.map((p) => (
            <tr>
              <td>{p.Flight_ID}</td>
              <td>{p.flight_state}</td>
              <td>{p.Platinum_Count}</td>
              <td>{p.Business_Count}</td>
              <td>{p.Economy_Count}</td>
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
    const data = {
      origin: origin,
      destination: destination,
    };
    try {
      const response = await axios.post("/past_flight", data);
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
              {<PastFlightCard data={datas} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PastFlight;
