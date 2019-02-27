import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_REQUEST_SUCCESS,
  GET_WEATHER_REQUEST_FAILURE
} from "../actions/weatherActions";
import { getTempInCelsius } from "../helpers/temp";

const initialState = {
  city: "",
  currentWeather: {
    icon: "",
    temp: 0
  },
  weatherForecast: {
    days: [],
    tempData: [],
    humidityData: []
  },
  loading: true,
  error: null
};

export default function responsesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER_REQUEST: {
      return {
        ...state,
        city: action.payload.city,
        loading: true
      };
    }

    case GET_WEATHER_REQUEST_SUCCESS: {
      const weatherData = action.payload.response;
      const currentWeather = weatherData.list[0];

      const dayLabels = weatherData.list.map(item => item.dt_txt.slice(5, -8));
      const tempData = weatherData.list.map(item =>
        getTempInCelsius(item.main.temp)
      );
      const humidityData = weatherData.list.map(item => item.main.humidity);

      const tempSeries = {
        labels: dayLabels,
        series: [[...tempData]]
      };

      const humiditySeries = {
        labels: dayLabels,
        series: [[], [...humidityData]]
      };

      return {
        ...state,
        loading: false,
        currentWeather: {
          temp: getTempInCelsius(currentWeather.main.temp),
          icon: currentWeather.weather[0].id
        },
        weatherForecast: {
          dayLabels: dayLabels,
          tempSeries: tempSeries,
          humiditySeries: humiditySeries
        }
      };
    }

    case GET_WEATHER_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
