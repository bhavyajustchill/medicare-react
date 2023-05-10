import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

export default function AdminHeader(props) {
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUserName(user.displayName);
        setEmailAddress(user.email);
      }
    });
  }, []);
  const [showDropDown, setShowDropDown] = useState(false);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login", { replace: true });
      })
      .then((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="main-header">
        <div className="logo-header">
          <Link to="/" className="logo">
            MediCare
          </Link>
          <button
            className="navbar-toggler sidenav-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="collapse"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <button className="topbar-toggler more">
            <i className="la la-ellipsis-v"></i>
          </button>
        </div>
        <nav className="navbar navbar-header navbar-expand-lg">
          <div className="container-fluid">
            <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
              <li className="nav-item dropdown">
                <a
                  href="#"
                  onClick={() => setShowDropDown(!showDropDown)}
                  className="dropdown-toggle profile-pic">
                  {" "}
                  <img
                    src={`assets/img/profile4.jpg`}
                    alt="user-img"
                    width="36"
                    className="img-circle"
                  />
                  <span>{userName !== "" ? userName : "Username"}</span>{" "}
                </a>
                <ul className={`dropdown-menu dropdown-user ${showDropDown ? "show" : ""}`}>
                  <li>
                    <div className="user-box">
                      <div className="u-img">
                        <img src={`assets/img/profile4.jpg`} alt="user" />
                      </div>
                      <div className="u-text">
                        <h4>{userName !== "" ? userName : "Username"}</h4>
                        <p className="text-muted">{emailAddress !== "" ? emailAddress : "Email"}</p>
                      </div>
                    </div>
                  </li>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/profile">
                    <i className="fa fa-power-off"></i> Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" type="button" onClick={handleLogout}>
                    <i className="fa fa-power-off"></i> Logout
                  </Link>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
