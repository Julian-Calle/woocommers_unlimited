import React from "react";
import map from "../assets/map24.jpeg";
import "../CSS/workshopsMap.css";

export default function WorkShopsMap() {
  return (
    <div className="sectionContainer">
      <img className="imgMap" src={map} alt={"mapa"} />
    </div>
  );
}
