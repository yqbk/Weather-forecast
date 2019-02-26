import {
  GET_API_REQUEST,
  GET_API_REQUEST_SUCCESS,
  GET_API_REQUEST_FAILURE
} from "../actions/requestActions";
import { getTempInCelsius } from "../helpers/temp";

const initialState = {
  city: "",
  response: "",
  currentWeatherIcon: "",
  currentWeatherTemp: 0,
  loading: false,
  error: null
};

export default function responsesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_API_REQUEST: {
      return {
        ...state,
        city: action.payload.city,
        loading: true
      };
    }

    case GET_API_REQUEST_SUCCESS: {
      const weatherData = action.payload.response;
      const currentWeather = weatherData.list[0];

      // console.log('reducer', currentWeather)

      return {
        ...state,
        loading: false,
        response: weatherData,
        currentWeatherIcon: currentWeather.weather[0].id,
        currentWeatherTemp: getTempInCelsius(currentWeather.main.temp)
      };
    }

    case GET_API_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
