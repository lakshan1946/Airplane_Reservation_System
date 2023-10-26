import Login from "./screen/Login/Login";
import Navbar from "./component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import Footer from "./component/Footer";
import Register from "./screen/RegisterUser/Register";
import React, { useEffect, useState } from "react";
import Booking from "./screen/Booking";
import SeatSelection from "./screen/SeattSelection";
import Payment from "./screen/Payment";
import FlightCard from "./component/FlightCard";
import Report from "./screen/Admin/Report";
import AllPassenger from "./screen/Admin/AllPassengers";
import DateDestination from "./screen/Admin/DateDestination";
import DateType from "./screen/Admin/DateType";
import PastFlight from "./screen/Admin/PastFlight";
import Revenue from "./screen/Admin/Revenue";
//const userIsGuess = true;

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [userIsGuess, setUserIsGuess] = useState(false);
  useEffect(() => {
    fetch("/")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                setUserIsGuess={setUserIsGuess}
                userIsGuess={userIsGuess}
              />
            }
          ></Route>
          <Route path="/HomeScreen" element={<HomeScreen />}></Route>
          <Route
            path="/register"
            element={<Register isGuess={userIsGuess} />}
          ></Route>
          <Route path="/Booking" element={<Booking />}></Route>
          <Route path="/Seatselection" element={<SeatSelection />}></Route>
          <Route path="/Payment" element={<Payment />}></Route>
          <Route path="/FlightCard" element={<FlightCard />}></Route>
          <Route path="/Report" element={<Report />}></Route>
          <Route path="/AllPassengers" element={<AllPassenger />} />
          <Route path="/DateDestination" element={<DateDestination />} />
          <Route path="/DateType" element={<DateType />} />
          <Route path="/PastFlight" element={<PastFlight />} />
          <Route path="/Revenue" element={<Revenue />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
