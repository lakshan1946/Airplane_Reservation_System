import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import axios from "axios";
import "../css/userProg.css";

function RegUserProfile() {
  const params = useParams();
  const navigate = useNavigate();

  // State to store the user data from the backend
  const [userData, setUserData] = useState({});
  const uname = params.username;
  const name = "r".concat(uname);

  useEffect(() => {
    // Create an async function to fetch data
    async function fetchData() {
      try {
        const response = await axios.post("/reguserprofile", params.username);
        // Update the user data state with the response data
        setUserData(response.data.message);
      } catch (error) {
        console.error(error);
        // Handle the error here
      }
    }

    // Call the async function to fetch data when the component mounts
    fetchData();
  }, [params.username]);

  const navigateToBooking = () => {
    navigate("/Booking");
  };

  return (
    <div className="backgroundRU">
      <Navbar />
      <h1 className="RegUserHead">Welcome to B Airline</h1>

      <div className="cont">
        <div className="RegUserContent">
          <h3 className="RegUserSubHead">User Details</h3>
          <table className="RegUserTable">
            <tbody>
              <tr>
                <th className="RegUserData">Passport ID</th>
                <td className="RegUserData">{userData.Passport_ID}</td>
              </tr>
              <tr>
                <th className="RegUserData">Username</th>
                <td className="RegUserData">{userData.UserName}</td>
              </tr>
              <tr>
                <th className="RegUserData">First name</th>
                <td className="RegUserData">{userData.First_Name}</td>
              </tr>
              <tr>
                <th className="RegUserData">Last name</th>
                <td className="RegUserData">{userData.Last_Name}</td>
              </tr>
              <tr>
                <th className="RegUserData">Mobile number</th>
                <td className="RegUserData">{userData.Phone_No}</td>
              </tr>
              <tr>
                <th className="RegUserData">Email</th>
                <td className="RegUserData">{userData.email}</td>
              </tr>
              <tr>
                <th className="RegUserData">Gender</th>
                <td className="RegUserData">{userData.gender}</td>
              </tr>
              <tr>
                <th className="RegUserData">address line 1</th>
                <td className="RegUserData">{userData.Address_Line_01}</td>
              </tr>
              <tr>
                <th className="RegUserData">address line 2</th>
                <td className="RegUserData">{userData.Address_Line_02}</td>
              </tr>
              <tr>
                <th className="RegUserData">No of bookings</th>
                <td className="RegUserData">{userData.No_of_bookings}</td>
              </tr>
              <tr>
                <th className="RegUserData">Catogory</th>
                <td className="RegUserData">{userData.Membership_status}</td>
              </tr>
            </tbody>
          </table>
          <div className="btnCont">
            <button
              type="button"
              className="btn btn-dark btn-lg"
              onClick={(e) => navigate(`/booking/${name}`)}
            >
              Book a Flight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegUserProfile;
