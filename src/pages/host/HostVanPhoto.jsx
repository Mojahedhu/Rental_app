import React from "react";
import { useOutletContext } from "react-router-dom";
function HostVanPhoto() {
  const van = useOutletContext();
  console.log(van);
  return <img className="host-van-image" src={van.imageUrl} alt="" />;
}

export default HostVanPhoto;
