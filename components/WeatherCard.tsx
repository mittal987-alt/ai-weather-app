import { WeatherData } from "@/types/weather";

export default function WeatherCard({ data }: { data: WeatherData }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h2 className="text-3xl font-semibold">{data.name}</h2>
        <p className="capitalize text-slate-300">
          {data.weather[0].description}
        </p>

        <p className="text-7xl font-bold mt-4">
          {Math.round(data.main.temp)}°
        </p>

        <div className="flex gap-6 mt-4 text-slate-300">
          <span>Feels {data.main.feels_like}°</span>
          <span>💧 {data.main.humidity}%</span>
          <span>🌬 {data.wind.speed} m/s</span>
        </div>
      </div>

      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
        alt=""
        className="w-40 h-40"
      />
    </div>
  );
}
