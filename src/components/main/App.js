import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAPI } from "../../actions/requestActions";
import { Navbar } from "react-bootstrap";
import "./App.css";
import SearchBar from "../searchBar/SearchBar";
import CurrentWeather from "../currentWeather/CurrentWeather";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAPI("warsaw");
  }

  render() {
    // console.log("2", this.props.response);
    return (
      <div className="App">
        <SearchBar />
        {this.props.response && this.props.response.list.length && (
          <CurrentWeather />
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
  address: state.responses.city
});

const mapDispatchToProps = dispatch => ({
  fetchAPI: city => dispatch(fetchAPI(city))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
