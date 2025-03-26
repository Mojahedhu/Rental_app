import React, { Suspense } from "react";
import { getVans } from "../../api";
import { useLoaderData, useSearchParams, Link, Await } from "react-router-dom";
import Loading from "../../components/Loading";

// eslint-disable-next-line react-refresh/only-export-components
export function loader() {
  const data = getVans();
  return { data };
}

function Vans() {
  const dataPromise = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }
  function rednerVanElements(vans) {
    const displayedVans = typeFilter
      ? vans.filter((van) => van.type === typeFilter)
      : vans;
    const vanElements = displayedVans.map((van) => (
      <div key={van.id} className="van-tile">
        <Link
          to={van.id}
          state={{
            search: `?${searchParams.toString()}`,
            type: typeFilter,
          }}
        >
          <img src={van.imageUrl} alt={van.name} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              <span>${van.price}</span>
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    ));
    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            className={`van-type simple ${
              typeFilter === "simple" ? "selected" : ""
            }`}
            onClick={() => {
              handleFilterChange("type", "simple");
            }}
          >
            Simple
          </button>
          <button
            className={`van-type rugged ${
              typeFilter === "rugged" ? "selected" : ""
            }`}
            onClick={() => {
              handleFilterChange("type", "rugged");
            }}
          >
            Rugged
          </button>
          <button
            className={`van-type luxury ${
              typeFilter === "luxury" ? "selected" : ""
            }`}
            onClick={() => {
              handleFilterChange("type", "luxury");
            }}
          >
            Luxury
          </button>
          {typeFilter && (
            <button
              className="van-type clear-filters"
              onClick={() => {
                handleFilterChange("type", null);
              }}
            >
              Clear
            </button>
          )}
        </div>
        <div
          className="van-list"
          style={{ display: Array.isArray(vans) ? "" : "block" }}
        >
          {vanElements}
        </div>
      </>
    );
  }
  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<Loading />}>
        <Await resolve={dataPromise.data}>{rednerVanElements}</Await>
      </Suspense>
    </div>
  );
}
export default Vans;
