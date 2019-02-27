import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAPI } from "../../actions/weatherActions";

import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./style.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: ""
    };
  }

  componentDidMount() {
    this.props.fetchAPI("warsaw");
  }

  onInputChange = event => {
    this.setState({ city: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.fetchAPI(this.state.city);
    this.setState({ city: "" });
  };

  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand>Weather</Navbar.Brand>
        <Nav className="mr-auto" />
        <Form inline onSubmit={this.onFormSubmit}>
          <div className="search">
            <FormControl
              type="text"
              placeholder="Type city name"
              className="mr-sm-2"
              value={this.state.city}
              onChange={this.onInputChange}
            />
            <Button variant="outline-success" type="submit">
              Go!
            </Button>
          </div>
        </Form>
      </Navbar>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAPI: city => dispatch(fetchAPI(city))
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
