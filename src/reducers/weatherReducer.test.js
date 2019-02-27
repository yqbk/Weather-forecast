import expect from "expect";

import * as actions from "../actions/weatherActions";

describe("Fetching weather data", function() {
  it("should create GET_WEATHER_REQUEST action with city name", function() {
    expect(actions.getWeatherRequest("Warsaw")).toEqual({
      type: "GET_WEATHER_REQUEST",
      payload: { city: "Warsaw" }
    });
  });

  it("should create a GET_WEATHER_REQUEST_FAILURE action with error", function() {
    expect(actions.getWeatherRequestFailure("can't fetch data")).toEqual({
      type: "GET_WEATHER_REQUEST_FAILURE",
      payload: { error: "can't fetch data" }
    });
  });

  it("should create a GET_WEATHER_SUCCESS action with API response", function() {
    expect(
      actions.getWeatherRequestSuccess({ list: [{ main: { temp: 10 } }] })
    ).toEqual({
      type: "GET_WEATHER_REQUEST_SUCCESS",
      payload: { response: { list: [{ main: { temp: 10 } }] } }
    });
  });
});
