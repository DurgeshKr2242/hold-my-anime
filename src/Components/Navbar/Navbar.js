import React from "react";
import { FaUserSecret } from "react-icons/fa";
import "./Navbar.css";
import logo from "./Logo.svg";
const Navbar = () => {
  return (
    <>
      {/* <div className="nav-container"> */}
      <div className="navbar">
        <div>
          <img className="logo" src={logo} alt="LOGO" />
        </div>
      </div>
      <div className="user">
        <FaUserSecret />
      </div>
      {/* </div> */}
    </>
  );
};

export default Navbar;
