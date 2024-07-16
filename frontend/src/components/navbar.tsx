import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../assets/CarrerSpotlogo.svg";
import LogoBlue from "../assets/CareerSpotBlue.svg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { LogOut, getMe, reset } from "../features/authSlice";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();

function Navbar() {
  const [userID, setUserID] = useState<number>(-1);
  const [userRole, setUserRole] = useState<string>("");
  const { isError, user, isSuccess } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setUserID(user.user_id);
      setUserRole(user.role);
    }
  }, [isError, isSuccess, user]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  }

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
              <Link className="nav-link" to={"/"}>
                Home
              </Link>
            </li>
            {
              (userRole == "staff") ?
                (
                  <li></li>
                ) :
                (
                  <li className="nav-item">
                    <Link className="nav-link" to={"/interview"}>
                      Interviews
                    </Link>
                  </li>
                )
            }
            {
              (userRole == "staff") ?
                (
                  <li></li>
                ) :
                (
                  <li>
                    <Link className="nav-link" to={"/portal"}>
                      Explore Jobs
                    </Link>
                  </li>
                )
            }
            {
              user ?
                (
                  (userRole == "staff") ?
                    (
                      <li className="nav-item"><Link className="nav-link" to={"/staffdashboard"}>Dashboard</Link></li>
                    ) :
                    (
                      <li className="nav-item"><Link className="nav-link" to={"/dashboard"}>Dashboard</Link></li>
                    )
                ) : (
                  <li></li>
                )
            }
            <li className="nav-item">
              {
                user ?
                  (
                    <button onClick={logout} className="nav-link">
                      Logout
                    </button>
                  ) : (
                    <Link className="nav-link" to={"/signup"}>
                      Login
                    </Link>
                  )
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
