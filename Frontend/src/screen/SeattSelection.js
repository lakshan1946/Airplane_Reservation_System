import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

function GenerateSeats(
  numRows,
  seatsPerRow,
  type,
  handle,
  navigate,
  setError,
  setSeatSelectionError, // Add setSeatSelectionError to the function parameters
  flightid,
  username
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
            onClick={(event) => {
              const seatId = event.target.id;

              // Check if the selected seat is already in the array
              if (selectedSeats.includes(seatId)) {
                // If it's already selected, remove it
                selectedSeats.splice(selectedSeats.indexOf(seatId), 1);
              } else {
                // If it's not selected, add it
                selectedSeats.push(seatId);
              }
            }}
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
          if (selectedSeats.length === 1) {
            handle(selectedSeats);
            selectedSeats.push(username);
            selectedSeats.push(flightid);
            SendData(selectedSeats, flightid, navigate);
            // navigate(`/payment/${rid}`);
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

async function SendData(data, flightID, navigate) {
  const response = await axios.post(`/seatselection/${flightID}`, data);
  const rid = await response.data[0].Reserve_ID;
  navigate(`/payment/${rid}`);
}

const SeatSelection = () => {
  const [selectSeat, setSelectedSeats] = useState([]);
  const [flightName, ssetflightName] = useState("");
  let [selectedModel, setSelectedModel] = useState("Boeing 737");
  const [selectedClass, setSelectedClass] = useState("Platinum");
  const [error, setError] = useState(""); // Add error state
  const [seatSelectionError, setSeatSelectionError] = useState(""); // New error state
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [flightdetail, setFlightDetail] = useState([]);

  // useEffect to get data from backend
  const params = useParams();
  const fid = params.flightid;
  const uname = params.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/seatselection/${fid}`);
        setFlightDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [fid]);

  useEffect(() => {
    if (flightdetail.length === undefined) {
      setSelectedModel(flightdetail.model);
      ssetflightName(flightdetail.Flight_Name);
    }
  }, [flightdetail]);

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
        <br></br>
        <label className="subP">
          Select Class:
          <select
            value={selectedClass}
            onChange={(e) => {
              handleClassChange(e);
              setActive(false);
            }}
          >
            {Object.keys(selectedAirplane.classes).map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <button
          type="button"
          class="btn btn-dark btn-lg "
          onClick={() => {
            setActive(true);
          }}
        >
          Show Seats
        </button>
        <br></br>
        <br></br>
      </div>
      <br></br>
      <br></br>
      {active && (
        <div className="airplane">
          <h2 className="seatHeadingSub">{flightName}</h2>
          <h3 className="classType">{selectedClass}</h3>
          {GenerateSeats(
            selectedSeats / (selectedClass === "Economy" ? 6 : 4),
            selectedClass === "Economy" ? 6 : 4,
            selectedClass,
            (seats) => {
              setSelectedSeats(seats);

              console.log(seats);
            },
            navigate,
            setError,
            setSeatSelectionError,
            fid,
            uname
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
      )}
    </div>
  );
};

export default SeatSelection;
