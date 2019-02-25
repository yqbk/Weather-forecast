const API_KEY = "2bc56728817d88f15b17efb38cf8c7df";
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export function fetchAPI(city) {
  return dispatch => {
    const url = `${ROOT_URL}&q=${city},pl`;
    dispatch(getAPIRequest(city));

    // Mock real address and get data from static files provided for the task
    return fetch(url)
      .then(handleErrors)
      .then(response => {
        console.log("1. response", response);
        return response.json();
      })
      .then(data => {
        console.log("1. response", data);
        return dispatch(getAPIRequestSuccess(data));
      })
      .catch(error => dispatch(getAPIRequestFailure(error)));
  };
}

// Handle HTTP errors
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const GET_API_REQUEST = "GET_API_REQUEST";
export const GET_API_REQUEST_SUCCESS = "GET_API_REQUEST_SUCCESS";
export const GET_API_REQUEST_FAILURE = "GET_API_REQUEST_FAILURE";

export const getAPIRequest = city => ({
  type: "GET_API_REQUEST",
  payload: { city }
});

export const getAPIRequestSuccess = response => {
  return {
    type: "GET_API_REQUEST_SUCCESS",
    payload: { response }
  };
};

export const getAPIRequestFailure = error => ({
  type: "GET_API_REQUEST_FAILURE",
  payload: { error }
});
