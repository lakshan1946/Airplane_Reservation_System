import Login from "./Login";
import Navbar from "./component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import Footer from "./component/Footer";
import Register from "./Register";
import React, { useEffect, useState } from "react";
import Booking from "./Booking";
import SeatSelection from "./SeattSelection";

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
          <Route
            path="/home"
            element={
              <HomeScreen
                setUserIsGuess={setUserIsGuess}
                userIsGuess={userIsGuess}
              />
            }
          ></Route>
          <Route
            path="/register"
            element={<Register isGuess={userIsGuess} />}
          ></Route>
          <Route path="/Booking" element={<Booking />}></Route>
          <Route path="/Seatselection" element={<SeatSelection />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
