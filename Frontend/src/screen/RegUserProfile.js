import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegUserProfile() {
  const params = useParams();
  const navigate = useNavigate();

  const uname = params.username;
  const name = "r".concat(uname);

  return (
    <div className="background">
      <h1 className="RegUserHead">Welcome to B Airline</h1>

      <div className="cont">
        <div className="RegUserContent">
          <h3 className="RegUserSubHead">User Details</h3>
          <table className="RegUserTable">
            <tbody>
              <tr>
                <th className="RegUserData">Passport ID</th>
                <td className="RegUserData">123</td>
              </tr>
              <tr>
                <th className="RegUserData">Username</th>
                <td className="RegUserData">lm123</td>
              </tr>
              <tr>
                <th className="RegUserData">First name</th>
                <td className="RegUserData">Lakshan</td>
              </tr>
              <tr>
                <th className="RegUserData">Last name</th>
                <td className="RegUserData">Madhusanka</td>
              </tr>
              <tr>
                <th className="RegUserData">Mobile number</th>
                <td className="RegUserData">0771946130</td>
              </tr>
              <tr>
                <th className="RegUserData">Email</th>
                <td className="RegUserData">a@gmdcdvdvdvdail.com</td>
              </tr>
              <tr>
                <th className="RegUserData">Gender</th>
                <td className="RegUserData">Male</td>
              </tr>
              <tr>
                <th className="RegUserData">address line 1</th>
                <td className="RegUserData">aaa</td>
              </tr>
              <tr>
                <th className="RegUserData">address line 2</th>
                <td className="RegUserData">vvv</td>
              </tr>
              <tr>
                <th className="RegUserData">No of bookings</th>
                <td className="RegUserData">5</td>
              </tr>
              <tr>
                <th className="RegUserData">Catogory</th>
                <td className="RegUserData">Gold</td>
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