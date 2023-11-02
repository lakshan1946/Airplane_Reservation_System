import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  // bg-body-tertiary
  return (
    <nav
      className="blackNavbar navbar navbar-expand-lg bg-transparent"
      data-bs-theme="dark"
      style={{ backgroundColor: "#001524" }}
    >
      <div className="container-fluid">
        <a className="navfont navbar-brand" href="">
          B Airline
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a
                className="navfont nav-link active"
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="navfont nav-link" href="#">
                Book Flight
              </a>
            </li>
            <li className="nav-item">
              <Link className="navfont nav-link" to="/HomeScreen">
                About us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {};

export default Navbar;
