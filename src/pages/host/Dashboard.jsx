import React from "react";
import { Outlet } from "react-router";

function Dashboard() {
  return (
    <>
      <div>Dashbaord Page</div>
      <Outlet />
    </>
  );
}

export default Dashboard;
