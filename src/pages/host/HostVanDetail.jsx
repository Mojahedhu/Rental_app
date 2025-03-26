import React, { Suspense } from "react";
import { getVan } from "../../api";
import { requireAuth } from "../../utils";
import { useLoaderData, NavLink, Link, Outlet, Await } from "react-router-dom";
import Loading from "../../components/Loading";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params, request }) {
  await requireAuth(request);
  const van = getVan(params.id);
  return { van };
}

function HostVanDetail() {
  const dataPromise = useLoaderData();
  const activeStyle = {
    color: "#161616",
    fontWeight: "700",
    textDecoration: "underline",
  };

  function renderHostVanDetail(currentVan) {
    return (
      <section>
        <Link to={".."} className="back-button" relative="path">
          &larr; <span>Back to all vans</span>
        </Link>
        <div className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={currentVan.imageUrl} alt={currentVan.name} />
            <div className="host-van-detail-info-text">
              <i className={`van-type van-type-${currentVan.type}`}>
                {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4>${currentVan.price}/day</h4>
            </div>
          </div>
          <nav className="host-van-detail-nav">
            <NavLink
              to="."
              end
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Details
            </NavLink>
            <NavLink
              to="pricing"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Pricing
            </NavLink>
            <NavLink
              to="photos"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Photos
            </NavLink>
          </nav>
          <Outlet context={currentVan} />
        </div>
      </section>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={dataPromise.van}>{renderHostVanDetail}</Await>
    </Suspense>
  );
}

export default HostVanDetail;
