import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAPI } from "../../actions/requestActions";

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

    this.props.fetchAPI(this.state.city);
    this.setState({ city: "" });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Get a five-day forecast in your favourite cities."
          className="form-control"
          value={this.state.city}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">
            {this.submitText}
          </button>
        </span>
      </form>
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
