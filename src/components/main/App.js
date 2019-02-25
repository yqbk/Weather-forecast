import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAPI } from "../../actions/requestActions";
import { Navbar } from "react-bootstrap";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAPI("warsaw");
  }

  render() {
    console.log("2", this.props.response);
    return (
      <div className="App">
        <header className="App-header">
          {this.props.response &&
            this.props.response.list.length &&
            this.props.response.list.map(dayWeather => {
              console.log(dayWeather);

              return <p>{dayWeather.main.temp - 273}</p>;
            })}
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  response: state.responses.response,
  address: state.responses.city
});

const mapDispatchToProps = dispatch => ({
  fetchAPI: city => dispatch(fetchAPI(city))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
