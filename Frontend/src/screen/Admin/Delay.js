import React, { useState } from "react";

function Delay() {
  const [time, setTime] = useState("");
  const [flightNo, setFlightNo] = useState("");
  return (
    <div>
      <form>
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
        <div className="form-group ">
          <label htmlFor="startDate" className="adminselect">
            Delay Time:
          </label>
          <input
            type="text"
            className="form-control gray-background"
            id="startDate"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default Delay;
