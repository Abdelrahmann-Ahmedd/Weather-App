import { apiCall, ApiOption } from "./ApiCallModel";
import type { GeografyResult, WeatherResponse } from "../Model/weater";

export const WeatherServices = {
  getCoordinates: (cityName: string) =>
    apiCall<GeografyResult>(ApiOption.Geocoding, {
      method: "GET",
      params: {
        name: cityName,
        count: 1,
        language: "en",
      },
    }),

  getWeather: (lat: number, lon: number, units: "metric" | "imperial" = "metric") => {
    const isMetric = units === "metric";

    const temperature_unit = isMetric ? "celsius" : "fahrenheit";
    const windspeed_unit = isMetric ? "kmh" : "mph";
    const precipitation_unit = isMetric ? "mm" : "inch";

    return apiCall<WeatherResponse>(ApiOption.Weather, {
      method: "GET",
      params: {
        latitude: lat,
        longitude: lon,
        timezone: "auto",
        current_weather: true,
        hourly:
          "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weathercode,wind_speed_10m",
        daily:
          "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode",
        forecast_days: 7,
        temperature_unit,
        windspeed_unit,
        precipitation_unit,
      },
    });
  },
};
