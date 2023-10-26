import React from "react";
import { useState } from "react";

function PastFlight() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleFlightDataSubmit = async (e) => {
    // e.preventDefault();
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
          <button type="submit" className="btn btn-primary">
            Get Flight Data by Route
          </button>
        </form>
      </div>
    </div>
  );
}

export default PastFlight;
