import React, { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import axios from 'axios';

const flight = [];

function BookingCard({ flight }) {
  const navigate = useNavigate();
  const params = useParams()

  const uname = params.username

  const navigatetoseatselection = (FlightID, UserName) => {
    navigate(`/seatselection/${FlightID}/${UserName}`)
  }

  return (
    <div id="con" className="card-body">
      <table className="FlightCardT">
        <tbody>
          <tr>
            <th className="FlightCardTh">Flight No</th>
            <th className="FlightCardTh">Model</th>
            <th className="FlightCardTh">Departure date and time</th>
            <th className="FlightCardTh">Arrival date and time</th>
            <th className="FlightCardTh">Booking</th>
          </tr>
          {flight.map((p) => (
            <tr>
              <td className="FlightCardTd">{p.Flight_Name}</td>
              <td className="FlightCardTd">{p.Model}</td>
              <td className="FlightCardTd">{p.Departure_Date_Time}</td>
              <td className="FlightCardTd">{p.Arrival_Date_Time}</td>
              <td className="FlightCardTd">
                <div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigatetoseatselection(p.Flight_ID, uname)}                  
                  >Book</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Booking = () => {
  // State to manage input values
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [active, setActive] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setActive(false)
    flight.splice(0, flight.length)
    // Perform flight search logic here
    // You can make API calls to retrieve flight data
    // For this example, let's assume we have a predefined list of flights

    const flightdata = {
      origin,
      destination,
      dDate: departureDate
    }

    await axios.post('/booking', flightdata)
      .then(res => {
        flight.push(...res.data);
      })
      .catch(err => {
        console.error(err)
      })
    
    setActive(true);
  };
  
  // Function to handle origin selection
  const handleOriginChange = (e) => {
    setOrigin(e.target.value);
  };

  // Function to handle destination selection
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  // Function to handle departure date selection
  const handleDepartureDateChange = (e) => {
    setDepartureDate(e.target.value);
  }

  return (
    <div className="container-fluid background p-3">
      <div className="d-flex justify-content-center align-items-center ">
        <div className="container-fluid">
          <h1 className="text-center searchHead">Find a Flight</h1>
          <form id="flight-search-form">
            <div className="row allrow col-sm-12">
              <div className="col-sm-12 col-md-4">
                <div className="form-groupHome">
                  <label className="p-2" htmlFor="departure">
                    From:{" "}
                  </label>
                  <select
                    className="gray-background"
                    id="departure"
                    name="departure"
                    required
                    value={origin}
                    onChange={handleOriginChange}
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
              </div>
              <div className="col-sm-12 col-md-4">
                <div className="form-groupHome">
                  <label className="p-2" htmlFor="destination">
                    To:{" "}
                  </label>
                  <select
                    className="gray-background"
                    id="destination"
                    name="destination"
                    required
                    value={destination}
                    onChange={handleDestinationChange}
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
              </div>
              <div className="col-sm-12 col-md-4">
                <div className="form-groupHome">
                  <label className="p-2" htmlFor="departure-date">
                    When
                  </label>
                  <input
                    className="gray-background"
                    type="date"
                    id="departure-date"
                    name="departure-date"
                    required
                    value={departureDate}
                    onChange={handleDepartureDateChange}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg submitBtn"
              onClick={handleSubmit}
            >
              Let's go!
            </button>
          </form>
        </div>
      </div>
      <div className="row next-line text-center">
        <h2 className="availableFlight">Available Flights</h2>
        <ul id="flight-results"></ul>
      </div>

      {/* Flight search results will be displayed here */}
      {active && (
        <div>
          <div className="cards FlightCardMap">
            {<BookingCard flight={flight} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
