import React from "react";

function FlightCard(props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={props.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.model}</h5>
        <table className="flightCardTable">
          <tbody>
            <tr>
              <th>Departure time</th>
              <td>{props.Dtime}</td>
            </tr>
            <tr>
              <th>Arrival time</th>
              <td>{props.Atime}</td>
            </tr>
          </tbody>
        </table>

        <a href="/seatselection" className="btn btn-primary">
          Book Seat
        </a>
      </div>
    </div>
  );
}

export default FlightCard;
