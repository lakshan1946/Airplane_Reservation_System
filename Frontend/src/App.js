import axios from 'axios';
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
    // Define the API endpoint you want to fetch
    const apiUrl = '/'; // Replace with the actual API endpoint URL
  
    // Use Axios to make the GET request
    axios.get(apiUrl)
      .then((response) => {
        // Check if the response status is OK (200)
        if (response.status === 200) {
          // Assuming that your API response is in JSON format, you can access the data like this
          const data = response.data;
          setBackendData(data);
        } else {
          console.error('Error: Unable to fetch data');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
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
