import React from "react";
import { useParams, NavLink, Outlet, Link } from "react-router-dom";
import bgimg from "../../assets/images/about-hero.png";

function HostVanDetail() {
  const { id } = useParams();
  const [currentVan, setCurrentVan] = React.useState([]);
  const activeStyle = {
    color: "#161616",
    fontWeight: "700",
    textDecoration: "underline",
  };
  React.useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentVan(data.vans));
  }, []);

  if (currentVan.length === 0) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <section>
        <Link to={".."} className="back-button" relative="path">
          &larr; <span>Back to all vans</span>
        </Link>
        <div className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={bgimg} alt={currentVan.name} />
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
          <Outlet context={[currentVan, setCurrentVan]} />
        </div>
      </section>
    );
  }
}

export default HostVanDetail;
