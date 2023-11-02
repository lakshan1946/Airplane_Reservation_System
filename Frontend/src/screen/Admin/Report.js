import React from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div id="reportHome" className="backgroundAdminbg">
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
            type="button"
            className="btn btn-outline-dark btnAdmin"
            onClick={navigateToAllpassenger}
          >
            Get Passengers by Age
          </button>
          <br></br>
          <button
            type="button"
            className="btn btn-outline-dark btnAdmin"
            onClick={navigateToDateDestination}
          >
            Get Passengers by Destination
          </button>
          <br></br>
          <button
            type="button"
            className="btn btn-outline-dark btnAdmin"
            onClick={navigateToDateType}
          >
            Get Booking by passenger type
          </button>
          <br></br>
          <button
            type="button"
            className="btn btn-outline-dark btnAdmin"
            onClick={navigateToPastFlight}
          >
            Get past details
          </button>
          <br></br>
          <button
            type="button"
            className="btn btn-outline-dark btnAdmin"
            onClick={navigateToRevenue}
          >
            Get total revenue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Report;
