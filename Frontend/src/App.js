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
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
//i am batman
export default App;
