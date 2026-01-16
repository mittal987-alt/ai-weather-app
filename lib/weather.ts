import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";
const GEO = "https://api.openweathermap.org/geo/1.0";

export const searchLocation = (query: string) =>
  axios.get(`${GEO}/direct?q=${query}&limit=5&appid=${API_KEY}`);

export const fetchWeatherByCoords = (lat: number, lon: number) =>
  axios.get(`${BASE}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);

export const fetchForecastByCoords = (lat: number, lon: number) =>
  axios.get(`${BASE}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);

export const fetchAQI = (lat: number, lon: number) =>
  axios.get(`${BASE}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
