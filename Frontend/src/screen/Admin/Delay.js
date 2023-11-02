import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar";

function Delay() {
  const [time, setTime] = useState("");
  const [flightNo, setFlightNo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      time: time,
      flightNo: flightNo,
    };
    axios
      .post("/delay", data)
      .then((response) => {
        setTimeout(() => {}, 1000);
      })
      .catch((error) => {
        console.error(error);
        // Handle registration error here
        console.log("Registration Failed");
      });
  };
  return (
    <div className="backgroundAdmin">
      <Navbar />
      <h1 className="adminTitle">Add Flight delay</h1>
      <div id="adminCont">
        <div className="admincomp">
          <form onSubmit={handleSubmit}>
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
                placeholder="Enter Delay Time"
                type="text"
                className="form-control gray-background"
                id="startDate"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="DelaySubbtn">
              <button
                type="submit"
                className="btn btn-dark btn-lg"
                style={{ width: "100%" }}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Delay;
