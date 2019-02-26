import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAPI } from "../../actions/requestActions";

import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./style.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.submitText = "Submit";

    this.state = {
      city: ""
    };
  }

  onInputChange = event => {
    this.setState({ city: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    // console.log("On submit");

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
              placeholder="Type city in Poland"
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
