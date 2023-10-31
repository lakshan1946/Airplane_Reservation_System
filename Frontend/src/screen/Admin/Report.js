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
    <div id="reportHome" className="background">
      <div id="reportProfile">
        <h1>Admin Profile</h1>
        <table>
          <tbody>
            <tr>
              <th>Username</th>
              <td>123</td>
            </tr>
            <tr>
              <th>First name</th>
              <td>Lakshan</td>
            </tr>
            <tr>
              <th>Last name</th>
              <td>Madhusanka</td>
            </tr>
          </tbody>
        </table>
        <div className="imgAdmin1">
          <img src="/images/admin.jpg" alt="admin" id="imgAdmin"></img>
        </div>
      </div>
      <div id="reportButton">
        <h1>Search Report</h1>
        <div>
          <button
            type="button"
            className="btn btn-primary btnAdmin"
            onClick={navigateToAllpassenger}
          >
            Get Passengers by Age
          </button>
          <br></br>
          <button
            type="button"
            className="btn btn-primary btnAdmin"
            onClick={navigateToDateDestination}
          >
            Get Passengers by Destination
          </button>
          <br></br>
          <button
            type="button"
            className="btn btn-primary btnAdmin"
            onClick={navigateToDateType}
          >
            Get Booking by passenger type
          </button>
          <br></br>
          <button
            type="button"
            className="btn btn-primary btnAdmin"
            onClick={navigateToPastFlight}
          >
            Get past details
          </button>
          <br></br>
          <button
            type="button"
            className="btn btn-primary btnAdmin"
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
