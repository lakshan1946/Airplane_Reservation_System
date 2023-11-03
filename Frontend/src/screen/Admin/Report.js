import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";

function Report() {
  const navigate = useNavigate();

  const navigateToAllpassenger = () => {
    navigate("/AllPassengers");
  };
  const navigateToDateType = () => {
    navigate("/DateType");
  };
  const navigateToPastFlight = () => {
    navigate("/PastFlight");
  };
  const navigateToRevenue = () => {
    navigate("/Revenue");
  };
  const navigateToDateDestination = () => {
    navigate("/DateDestination");
  };
  const navigateToDelay = () => {
    navigate("/Delay");
  };
  return (
    <div className="backgroundAdminbg">
      <Navbar />
      <div id="reportHome">
        <div id="reportProfile">
          <h1 className="reportH">Admin Profile</h1>
          <table>
            <tbody>
              <tr>
                <th className="reportTH">First name</th>
                <td className="reportTD">Lakshan</td>
              </tr>
              <tr>
                <th className="reportTH">Last name</th>
                <td className="reportTD">Madhusanka</td>
              </tr>
            </tbody>
          </table>
          <div className="imgAdmin1">
            <img src="/images/admin.jpg" alt="admin" id="imgAdmin"></img>
          </div>
        </div>
        <div id="reportButton">
          <h1 className="reportH1">Search Report</h1>
          <div>
            <button
              style={{ width: "90%" }}
              type="button"
              className="btn btn-outline-dark btnAdmin"
              onClick={navigateToAllpassenger}
            >
              Get Passengers by Age
            </button>
            <br></br>
            <button
              style={{ width: "90%" }}
              type="button"
              className="btn btn-outline-dark btnAdmin"
              onClick={navigateToDateDestination}
            >
              Get Passengers by Destination
            </button>
            <br></br>
            <button
              style={{ width: "90%" }}
              type="button"
              className="btn btn-outline-dark btnAdmin"
              onClick={navigateToDateType}
            >
              Get Booking by passenger type
            </button>
            <br></br>
            <button
              style={{ width: "90%" }}
              type="button"
              className="btn btn-outline-dark btnAdmin"
              onClick={navigateToPastFlight}
            >
              Get past details
            </button>
            <br></br>
            <button
              style={{ width: "90%" }}
              type="button"
              className="btn btn-outline-dark btnAdmin"
              onClick={navigateToRevenue}
            >
              Get total revenue
            </button>
            <br></br>
            <button
              style={{ width: "90%" }}
              type="button"
              className="btn btn-dark btnAdmin"
              onClick={navigateToDelay}
            >
              Add delay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
