import { Collapse } from "bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

function generateSeats(numRows, seatsPerRow, type, handle) {
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
    <div>
      <button
        type="button"
        class="btn btn-secondary btn-lg btnContinue"
        onClick={() => {
          handle(selectedSeats);
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
  const [selectedNumber, setSelectedNumber] = useState("");
  const navigate = useNavigate();
  const numberInputRef = useRef(null); // Ref for the number of passengers dropdown

  useEffect(() => {
    if (error) {
      // Set focus to the number of passengers dropdown when an error occurs
      numberInputRef.current.focus();
    }
  }, [error]);

  const handleNumberChange = (e) => {
    setSelectedNumber(e.target.value);
  };

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
          }
        )}
      </div>
    </div>
  );
}

export default SeatSelection;
