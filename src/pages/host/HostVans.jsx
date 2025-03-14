import React from "react";
import { Link } from "react-router-dom";
import bgimgae from "../../assets/images/about-hero.png";
function HostVans() {
  const [vans, setVans] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/host/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const hostVansEls = vans.map((van) => (
    <Link
      className="host-van-link-wrapper"
      key={van.id}
      to={`/host/vans/${van.id}`}
    >
      <div className="host-van-single" key={van.id}>
        <img src={bgimgae} alt={`${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}</p>
        </div>
      </div>
    </Link>
  ));
  return (
    <section className="host-vans">
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {vans.length > 0 ? (
          <section>{hostVansEls}</section>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
}

export default HostVans;
