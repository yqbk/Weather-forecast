import React, { Component } from "react";
import { connect } from "react-redux";
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

    const { currentWeatherIcon, currentWeatherTemp, city } = this.props;

    console.log("?", currentWeatherIcon, currentWeatherTemp);

    return (
      <div className="App">
        <SearchBar />

        {this.props.response && this.props.response.list.length && (
          <CurrentWeather icon={currentWeatherIcon} temp={currentWeatherTemp} city={city}/>
        )}
        {/* {this.props.response &&
          this.props.response.list.length &&
          this.props.response.list.map(dayWeather => {
            // console.log(dayWeather);

            const temp = Math.round((dayWeather.main.temp - 273) * 100) / 100;
            return <p>{temp}</p>;
          })} */}
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
