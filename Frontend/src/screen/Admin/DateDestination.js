import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar";
import { Nav } from "react-bootstrap";
// Import Axios for making HTTP requests

let datas;

function DateDestinationCard({ data }) {
  return (
    <div className="card-body admintable">
      <table className="">
        <tbody>
          <tr></tr>
          {data &&
            data.map((p) => (
              <tr>
                <th className="adminth">Count</th>
                <td className="adminth">{p.Count}</td>
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
      destination: destination,
    };
    try {
      const response = await axios.post("/date_destination", data);
      // Handle the response from the backend as needed
      datas = response.data.count;
      console.log([datas]);
      // Set active to true to display the result
      setActive(true);
    } catch (error) {
      console.error("Error while making the request:", error);
    }
  };
  return (
    <div className="backgroundAdmin">
      <Navbar />
      <h1 className="adminTitle">View Passengers by destination</h1>
      <div id="adminCont">
        <div className="admincomp">
          <form onSubmit={handleDestinationSubmit} className="mb-3">
            <div className="form-group ">
              <label htmlFor="startDate" className="adminselect">
                Start Date:
              </label>
              <input
                type="date"
                className="form-control gray-background"
                id="startDate"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate" className="adminselect">
                End Date:
              </label>
              <input
                type="date"
                required
                className="form-control gray-background"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="destination" className="adminselect">
                Destination:
              </label>
              <select
                className="form-select"
                id="specificSizeSelect"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">Select destination</option>
                <option value="CGK">CGK(Indonesia)</option>
                <option value="DPS">DPS(Indonesia)</option>
                <option value="BIA">BIA(Sri Lanka)</option>
                <option value="HRI">HRI(Sri Lanka)</option>
                <option value="DEL">DEL(India)</option>
                <option value="BOM">BOM(India)</option>
                <option value="MAA">MAA(India)</option>
                <option value="BKK">BKK(Thailand)</option>
                <option value="DMK">DMK(Thailand)</option>
                <option value="SIN">SIN(Singapore)</option>
              </select>
            </div>
            <p></p>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={setActive}
            >
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
    </div>
  );
}

export default DateDestination;
