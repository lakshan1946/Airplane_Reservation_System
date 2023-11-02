import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar";

let datas;

function TotalRevenueCard({ data }) {
  return (
    <div className="card-body admintable">
      <div className="admintablesub">
        <table className="admint ">
          <tbody>
            {data &&
              data.map((p) => (
                <tr>
                  <td className="admincol">{p.Revenue} $</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
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
      model: aircraftType,
    };
    try {
      const response = await axios.post("/revenue", data);
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
      <h1 className="adminTitle">Total revenue</h1>
      <div id="adminCont">
        <div className="admincomp">
          <form onSubmit={handleRevenueSubmit} className="mb-3">
            <div className="form-group">
              <label htmlFor="origin" className="adminselect">
                Aircraft type
              </label>
              <select
                className="form-select"
                id="specificSizeSelect"
                required
                value={aircraftType}
                onChange={(e) => setAircraftType(e.target.value)}
              >
                <option value="">Select Aircraft type</option>
                <option value="Airbus A380">Airbus A380</option>
                <option value="Boeing 737">Boeing 737</option>
                <option value="Boeing 757">Boeing 757</option>
              </select>
            </div>
            <p></p>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={setActive}
            >
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
    </div>
  );
}

export default Revenue;
