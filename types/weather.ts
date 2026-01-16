export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  coord: {
    lat: number;
    lon: number;
  };
}

export interface AQIData {
  list: {
    main: {
      aqi: number;
    };
  }[];
}

export interface ForecastItem {
  dt_txt: string;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    icon: string;
  }[];
}
