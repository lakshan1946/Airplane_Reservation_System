import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar";

let datas;

function PastFlightCard({ data }) {
  return (
    <div className="card-body admintable">
      <div className="admintablesub">
        <table className="admint">
          <tbody>
            <tr>
              <th className="adminth">Flight ID</th>
              <th className="adminth">Flight State</th>
              <th className="adminth">Platinum Count</th>
              <th className="adminth">Business Count</th>
              <th className="adminth">Economy Count</th>
            </tr>
            {data &&
              data.map((p) => (
                <tr>
                  <td className="admincol">{p.Flight_ID}</td>
                  <td className="admincol">{p.flight_state}</td>
                  <td className="admincol">{p.Platinum_Count}</td>
                  <td className="admincol">{p.Business_Count}</td>
                  <td className="admincol">{p.Economy_Count}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
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
      <Navbar />
      <h1 className="adminTitle">View of past details</h1>
      <div id="adminCont">
        <div className="admincomp">
          <form onSubmit={handleFlightDataSubmit} className="mb-3">
            <div className="form-group">
              <label htmlFor="origin" className="adminselect">
                Origin:
              </label>
              <select
                className="form-select"
                id="specificSizeSelect"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              >
                <option value="">Select origin</option>
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
    </div>
  );
}

export default PastFlight;
