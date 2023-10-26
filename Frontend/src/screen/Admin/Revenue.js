import React from "react";
import { useState } from "react";

function Revenue() {
  const [aircraftType, setAircraftType] = useState("");

  const handleRevenueSubmit = async (e) => {
    // e.preventDefault();
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
          <button type="submit" className="btn btn-primary">
            Get Total revenue by Aircraft type
          </button>
        </form>
      </div>
    </div>
  );
}

export default Revenue;
