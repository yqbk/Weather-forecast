import React from "react";
import "./style.css";

const CurrentWeather = ({ icon, temp, city }) => {
  return (
    <div className={"current-weather-container"}>
      <h4>
        Current weather condition for <p className={"city-name"}>{city}</p>
      </h4>
      <div className="current-weather">
        <i className={"wi wi-owm-" + icon} />
        <div className="current-weather-info">
          <p>{temp + "°C"}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
