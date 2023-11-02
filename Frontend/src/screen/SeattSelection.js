import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

const airplaneModels = [
  {
    name: "Airbus A380",
    classes: {
      Platinum: 12,
      Business: 88,
      Economy: 420,
    },
  },
  {
    name: "Boeing 737",
    classes: {
      Platinum: 8,
      Business: 28,
      Economy: 90,
    },
  },
  {
    name: "Boeing 757",
    classes: {
      Platinum: 12,
      Business: 40,
      Economy: 150,
    },
  },
];

function generateSeats(
  numRows,
  seatsPerRow,
  type,
  handle,
  navigate,
  setError,
  setSeatSelectionError // Add setSeatSelectionError to the function parameters
) {
  let seatNumber = 1;
  const seats = [];
  const selectedSeats = [];

  for (let i = 1; i <= numRows; i++) {
    const rowSeats = [];
    for (let j = 1; j <= seatsPerRow; j++) {
      rowSeats.push(
        <li key={`${i}${type.charAt(0)}${j}`} className={`${type}_seat`}>
          <input
            type="checkbox"
            id={`${i}${type.charAt(0)}${j}`}
            onClick={(event) => selectedSeats.push(event.target.id)}
          />
          <label htmlFor={`${i}${type.charAt(0)}${j}`}>{seatNumber}</label>
        </li>
      );
      seatNumber++;
    }
    seats.push(
      <ul className="seats" key={`${i}${type.charAt(0)}`}>
        {rowSeats}
      </ul>
    );
  }

  seats.push(
    <div className="btnContinue">
      <button
        type="button"
        class="btn btn-dark btn-lg "
        onClick={() => {
          handle(selectedSeats);
          if (selectedSeats.length === 1) {
            navigate("/payment");
            setError(""); // Clear any existing errors
            setSeatSelectionError(""); // Clear seat selection error
          } else {
            setSeatSelectionError("Please select only one seat."); // Set seat selection error
          }
        }}
      >
        Next
      </button>
    </div>
  );

  return seats;
}

function SeatSelection() {
  const [selectSeat, setSelectedSeats] = useState([]);
  const [selectedModel, setSelectedModel] = useState(airplaneModels[0].name);
  const [selectedClass, setSelectedClass] = useState("Platinum");
  const [error, setError] = useState(""); // Add error state
  const [seatSelectionError, setSeatSelectionError] = useState(""); // New error state
  const navigate = useNavigate();

  // useEffect to handle seatSelectionError changes

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const selectedAirplane = airplaneModels.find(
    (model) => model.name === selectedModel
  );

  const selectedSeats = selectedAirplane.classes[selectedClass];

  return (
    <div className="seatSelectionContainer background p-3">
      <Navbar />
      <h1 className="seatHeading">Seat Selection</h1>
      <div className="selectionControls">
        <label className="subP">
          Select Airplane Model:
          <select value={selectedModel} onChange={handleModelChange}>
            {airplaneModels.map((model) => (
              <option key={model.name} value={model.name}>
                {model.name}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <label className="subP">
          Select Class:
          <select value={selectedClass} onChange={handleClassChange}>
            {Object.keys(selectedAirplane.classes).map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </label>
        <br></br>
      </div>
      <div className="airplane">
        <h2 className="seatHeadingSub">{selectedModel}</h2>
        <h3 className="classType">{selectedClass}</h3>
        {generateSeats(
          selectedSeats / (selectedClass === "Economy" ? 6 : 4),
          selectedClass === "Economy" ? 6 : 4,
          selectedClass,
          (seats) => {
            setSelectedSeats(seats);

            console.log(seats);
          },
          navigate,
          setError,
          setSeatSelectionError
        )}
        <div>
          {seatSelectionError && (
            <p
              className="error"
              style={{
                color: "#C70039",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                fontWeight: "bold",
              }}
            >
              {seatSelectionError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
