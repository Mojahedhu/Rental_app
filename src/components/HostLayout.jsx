import React from "react";
import { NavLink, Outlet } from "react-router-dom";
function HostLayout() {
  const activeStyle = {
    color: "#161616",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <>
      <nav className="host-nav">
        <NavLink
          to={"/host"}
          end
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Dashbaord
        </NavLink>
        <NavLink
          to={"income"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Income
        </NavLink>
        <NavLink
          to={"vans"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Vans
        </NavLink>
        <NavLink
          to={"reviews"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default HostLayout;
