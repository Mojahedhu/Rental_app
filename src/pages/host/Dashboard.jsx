import React, { Suspense } from "react";
import { requireAuth } from "../../utils";
import { getHostVans } from "../../api";
import { Await, Link, useLoaderData } from "react-router";
import { BsStarFill } from "react-icons/bs";
import Loading from "../../components/Loading";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  const auth = await requireAuth(request);
  const vans = getHostVans();
  return { vans: vans, auth: auth };
}

function Dashboard() {
  const loaderData = useLoaderData();
  function rednerVanElements(vans) {
    const hostVansEls = vans.map((van) => (
      <div className="host-van-single" key={van.id}>
        <img width={"150px"} src={van.imageUrl} alt={van.nam} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
        <Link to={`vans/${van.id}`}>View</Link>
      </div>
    ));
    return (
      <div className="host-vans-list">
        <section>{hostVansEls}</section>
      </div>
    );
  }
  return (
    <>
      <section className="host-dashboard-earnings">
        <div className="info">
          <h1>Welcome!</h1>
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2.260</h2>
        </div>
        <Link to={"income"}>Details</Link>
      </section>
      <section className="host-dashboard-reviews">
        <h2>Review score</h2>
        <BsStarFill className="star" />
        <p>
          <span>5.0</span>/5
        </p>
        <Link to={"reviews"}>Details</Link>
      </section>
      <section className="host-dashboard-vans">
        <div className="top">
          <h2>You listed vans</h2>
          <Link to={"vans"}>View all</Link>
        </div>
        <Suspense fallback={<Loading />}>
          <Await resolve={loaderData.vans}>{rednerVanElements}</Await>
        </Suspense>
      </section>
    </>
  );
}

export default Dashboard;
