import React from "react";
import schedule from "../assets/schedule.jpg";
import "../CSS/workshopsMap.css";

export default function Schedule() {
  return (
    <div className="sectionContainer">
      <img className="imgMap" src={schedule} alt={"mapa"} />
    </div>
  );
}
