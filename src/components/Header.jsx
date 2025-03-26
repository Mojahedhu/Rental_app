import React from "react";
import { Link, NavLink } from "react-router-dom";
import iconImage from "../assets/images/avatar-icon.png";
function Header() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  function fakeLogout() {
    localStorage.removeItem("loggedin");
  }

  return (
    <header>
      <NavLink to={"/"} className="site-logo">
        #VanLife
      </NavLink>
      <nav>
        <NavLink
          to={"/host"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Host
        </NavLink>
        <NavLink
          to={"about"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          About
        </NavLink>
        <NavLink
          to={"vans"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Vans
        </NavLink>
        <Link to={"login"} className="login-link">
          <img src={iconImage} alt="login" className="login-icon" />
        </Link>
      </nav>
      <button onClick={fakeLogout}>x</button>
    </header>
  );
}

export default Header;
