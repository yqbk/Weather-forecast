import React, { Component } from "react";
import { connect } from "react-redux";
import ChartistGraph from "react-chartist";
import { fetchAPI } from "../../actions/requestActions";

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import "./App.css";
import SearchBar from "../searchBar/SearchBar";
import CurrentWeather from "../currentWeather/CurrentWeather";
import { getTempInCelsius } from "../../helpers/temp";
import LineChart from "../lineChart/LineChart";

class App extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   currentWeatherTemp: 0,
    //   currentWeatherIcon: ""
    // };
  }

  componentDidMount() {
    this.props.fetchAPI("warsaw");
  }

  // componentDidUpdate() {
  //   this.setCurrentWeather();
  // }

  // setCurrentWeather = () => {
  //   const currentWeatherData = this.props.response && this.props.response.list[0];

  //   console.log(this.props.response);
  //   console.log("hej");

  //   // this.setState({
  //   //   currentWeatherIcon: currentWeatherData.weather[0].id,
  //   //   currentWeatherTemp: getTempInCelsius(currentWeatherData.main.temp)
  //   // });

  //   // this.icon = currentWeatherData.weather[0].id;
  //   // this.temp = getTempInCelsius(currentWeatherData.main.temp);
  //   // console.log("update current weather:", this.temp);
  // };

  render() {
    // console.log("2", this.props.response);

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
            <i className="fa fa-refresh fa-spin fa-5x fa-fw" />
          </div>
        ) : (
          <div>
            <CurrentWeather
              icon={currentWeatherIcon}
              temp={currentWeatherTemp}
              city={city}
            />
            <LineChart
              data={tempSeries}
              title={"Temperature in 5 days"}
            />
            <LineChart
              data={humiditySeries}
              title={"Humidity in 5 days"}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // response: state.weather.response,
  loading: state.weather.loading,
  city: state.weather.city,
  currentWeatherTemp: state.weather.currentWeather.temp,
  currentWeatherIcon: state.weather.currentWeather.icon,
  // dayLabels: state.weather.weatherForecast.dayLabels,
  tempSeries: state.weather.weatherForecast.tempSeries,
  humiditySeries: state.weather.weatherForecast.humiditySeries
});

const mapDispatchToProps = dispatch => ({
  fetchAPI: city => dispatch(fetchAPI(city))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
