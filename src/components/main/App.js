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
      response
    } = this.props;

    const time =
      response && response.list.map(item => item.dt_txt.slice(5, -8));

    const temp =
      response && response.list.map(item => getTempInCelsius(item.main.temp));

    const humidity = response && response.list.map(item => item.main.humidity);

    const data = {
      labels: time,
      series: [[...temp]]
    };

    const data2 = {
      labels: time,
      series: [[], [...humidity]]
    };

    const tempChartOptions = {
      high: Math.max(temp) + 5,
      low: Math.min(temp) - 5
    };

    const humidityChartOptions = {
      high: 100,
      low: 0
    };

    return (
      <div className="App">
        <SearchBar />

        {this.props.response && this.props.response.list.length && (
          <div>
            <CurrentWeather
              icon={currentWeatherIcon}
              temp={currentWeatherTemp}
              city={city}
            />
            <LineChart
              data={data}
              options={tempChartOptions}
              title={"Temperature in 5 days"}
            />
            <LineChart
              data={data2}
              options={humidityChartOptions}
              title={"Humidity in 5 days"}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  response: state.responses.response,
  loading: state.responses.loading,
  city: state.responses.city,
  currentWeatherTemp: state.responses.currentWeatherTemp,
  currentWeatherIcon: state.responses.currentWeatherIcon
});

const mapDispatchToProps = dispatch => ({
  fetchAPI: city => dispatch(fetchAPI(city))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
