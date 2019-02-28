import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import SearchBar from "../searchBar/SearchBar";
import CurrentWeather from "../currentWeather/CurrentWeather";
import LineChart from "../lineChart/LineChart";

class App extends Component {
  render() {
    const {
      currentWeatherIcon,
      currentWeatherTemp,
      city,
      tempSeries,
      humiditySeries
    } = this.props;

    return (
      <div className="App">
        <SearchBar />

        {this.props.loading ? (
          <div className="loader">
            {/* <i className="fas fa-refresh fa-spin fa-5x fa-fw" /> */}
            {/* <span class="fas fa-spinner fa-7x"></span> */}
            <i class="fas fa-spinner fa-spin fa-5x fa-fw"></i>

            <span className={"loading-text"}>Loading...</span>
          </div>
        ) : (
          <div>
            <CurrentWeather
              icon={currentWeatherIcon}
              temp={currentWeatherTemp}
              city={city}
            />
            <LineChart data={tempSeries} title={"Temperature in 5 days"} />
            <LineChart data={humiditySeries} title={"Humidity in 5 days"} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.weather.loading,
  city: state.weather.city,
  currentWeatherTemp: state.weather.currentWeather.temp,
  currentWeatherIcon: state.weather.currentWeather.icon,
  tempSeries: state.weather.weatherForecast.tempSeries,
  humiditySeries: state.weather.weatherForecast.humiditySeries
});

export default connect(
  mapStateToProps,
  null
)(App);
