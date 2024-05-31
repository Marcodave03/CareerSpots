import { Link } from "react-router-dom";
import Logo from "../assets/CarrerSpotlogo.svg";
import LogoBlue from "../assets/CareerSpotBlue.svg";
import React from "react";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            className="image-fluid"
            src={LogoBlue}
            style={{ objectFit: "contain", width: 150, height: "auto" }}
            id=""
            alt=""
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="portal">
                Explore Jobs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="interview">
                Interviews
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="signup">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
