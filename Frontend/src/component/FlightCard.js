import React from "react";

function FlightCard(props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src="props.image" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">props.model</h5>
        <p className="card-text"></p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default FlightCard;
