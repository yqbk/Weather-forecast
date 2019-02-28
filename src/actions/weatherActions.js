const API_KEY = "2bc56728817d88f15b17efb38cf8c7df";
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export function fetchAPI(city) {
  return dispatch => {
    const url = `${ROOT_URL}&q=${city}`;
    dispatch(getWeatherRequest(city));

    return fetch(url)
      .then(handleErrors)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return dispatch(getWeatherRequestSuccess(data));
      })
      .catch(error => dispatch(getWeatherRequestFailure(error)));
  };
}

// Handle HTTP errors
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const GET_WEATHER_REQUEST = "GET_WEATHER_REQUEST";
export const GET_WEATHER_REQUEST_SUCCESS = "GET_WEATHER_REQUEST_SUCCESS";
export const GET_WEATHER_REQUEST_FAILURE = "GET_WEATHER_REQUEST_FAILURE";

export const getWeatherRequest = city => ({
  type: "GET_WEATHER_REQUEST",
  payload: { city }
});

export const getWeatherRequestSuccess = response => ({
  type: "GET_WEATHER_REQUEST_SUCCESS",
  payload: { response }
});

export const getWeatherRequestFailure = error => ({
  type: "GET_WEATHER_REQUEST_FAILURE",
  payload: { error }
});
