import React, { Suspense } from "react";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";
import { useLoaderData, Link, Await } from "react-router-dom";
import Loading from "../../components/Loading";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  await requireAuth(request);
  const vans = getHostVans();
  return { vans };
}

function HostVans() {
  const dataPromise = useLoaderData();
  function renderHostVansEls(vans) {
    const vansEls = vans.map((van) => (
      <Link className="host-van-link-wrapper" key={van.id} to={van.id}>
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}</p>
          </div>
        </div>
      </Link>
    ));

    return (
      <div className="host-vans-list">
        <section>{vansEls}</section>
      </div>
    );
  }

  return (
    <section className="host-vans">
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense fallback={<Loading />}>
        <Await resolve={dataPromise.vans}>{renderHostVansEls}</Await>
      </Suspense>
    </section>
  );
}

export default HostVans;
