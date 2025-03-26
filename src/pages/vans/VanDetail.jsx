import React, { Suspense } from "react";
import { getVan } from "../../api";
import { Await, Link, useLoaderData, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ params }) {
  const van = getVan(params.id);
  return { van };
}

function VanDetail() {
  const dataPromise = useLoaderData();
  const location = useLocation();
  const search = location.state?.search || "";
  const text = location.state?.type || "all";

  function renderVanDetail(van) {
    return (
      <div className="van-detail-container">
        <Link
          to={location.state ? `..${search}` : ".."}
          className="back-button"
          relative="path"
        >
          &larr; <span>Back to {text} vans</span>
        </Link>
        <div className="van-detail">
          <img src={van.imageUrl} alt={van.name} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>
            <span>/day</span>
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={dataPromise.van}>{renderVanDetail}</Await>
    </Suspense>
  );
}

export default VanDetail;
