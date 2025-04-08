import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import iconImage from "../assets/images/avatar-icon.png";
import { deleteCurrentUser, logoutUser } from "../authService";
import { BsPower } from "react-icons/bs";
function Header() {
  const navigate = useNavigate();
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <header>
      <NavLink to={"/"} className="site-logo">
        #VanLife
      </NavLink>
      <nav>
        <NavLink
          to={"host"}
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
        <Link to={"personal"} className="login-link">
          <img src={iconImage} alt="login" className="login-icon" />
        </Link>
      </nav>
      <button
        onClick={() => {
          logoutUser();
          navigate("/");
        }}
      >
        <BsPower />
      </button>
    </header>
  );
}

export default Header;
