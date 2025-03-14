import React from "react";
import { useParams } from "react-router-dom";
import bgImage from "../../assets/images/about-hero.png";

function VanDetail() {
  const param = useParams();
  const [van, setVan] = React.useState();

  React.useEffect(() => {
    fetch(`/api/vans/${param.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [param.id]);
  return (
    <div className="van-detail-container">
      {van ? (
        <div className="van-detail">
          <img src={bgImage} alt={van.name} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>
            <span>/day</span>
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
}

export default VanDetail;
