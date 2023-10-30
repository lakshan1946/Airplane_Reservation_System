import React from "react";
import { useState } from "react";
import axios from "axios";

let datas

function DateTypeCard({ data }) {
  return (
    <div className="card-body">
      <table className="">
        <tbody>
          <tr>
            <th>Sum_Guest</th>
            <th>Sum_Normal</th>
            <th>Sum_Frequent</th>
            <th>Sum_Gold</th>
          </tr>
          {data && data.map((p) => (
            <tr>
              <td>{p.sum_Guest}</td>
              <td>{p.sum_Normal}</td>
              <td>{p.sum_Frequent}</td>
              <td>{p.sum_Gold}</td>
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
  const [active, setActive] = useState(false);

  const handleBookingsSubmit = async (e) => {
    e.preventDefault();
    console.log(startDate, endDate);
    // const bookings = await getBookingsByPassengerType(startDate, endDate);
    // console.log("Bookings by passenger type:", bookings);
    const data = {
      startDate: startDate,
      endDate: endDate,
    };

    // Make a POST request to your backend API with the data
    try {
      const response = await axios.post("/date_type", data);
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
    <div className="admincomp ">
      <form onSubmit={handleBookingsSubmit}>
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
        <button
          type="submit"
          className="btn btn-primary"
          onClick={setActive}
        >
          Get Bookings by Passenger Type
        </button>
      </form>
      {active && (
        <div>
          <div className="cards FlightCardMap">
            {<DateTypeCard data={datas} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default DateDestination;
