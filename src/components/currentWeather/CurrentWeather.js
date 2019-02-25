import React, { Component } from "react";
import { connect } from "react-redux";
import { getTempInCelsius } from "../../helpers/temp";
import "./style.css";

class CurrentWeather extends Component {
  constructor(props) {
    super(props);

    const currentWeatherData = this.props.response.list[0];

    this.icon = currentWeatherData.weather[0].id;
    this.temp = getTempInCelsius(currentWeatherData.main.temp);
  }
  render() {
    // console.log("2", this.props.response);
    return (
      <div className="current-weather">
        <i className={"wi wi-owm-" + this.icon} />
        <div className="current-weather-info">
          <p>{this.temp + "°C"}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  response: state.responses.response
});

export default connect(
  mapStateToProps,
  null
)(CurrentWeather);
