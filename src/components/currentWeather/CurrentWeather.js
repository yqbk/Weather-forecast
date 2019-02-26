import React, { Component } from "react";
import "./style.css";

const CurrentWeather = ({ icon, temp, city }) => {
  // console.log("-> ", icon, temp);

  return (
    <div className="current-weather">
      <i className={"wi wi-owm-" + icon} />
      <p>{city}</p>
      <div className="current-weather-info">
        <p>{temp + "°C"}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
