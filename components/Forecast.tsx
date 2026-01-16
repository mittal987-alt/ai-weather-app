import { ForecastItem } from "@/types/weather";

export default function Forecast({ list }: { list: ForecastItem[] }) {
  const daily = list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">5-Day Forecast</h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {daily.map((day) => (
          <div
            key={day.dt_txt}
            className="bg-slate-900/60 p-4 rounded-2xl text-center hover:scale-105 transition"
          >
            <p className="text-sm text-slate-300">
              {new Date(day.dt_txt).toLocaleDateString("en-IN", {
                weekday: "short",
              })}
            </p>

            <img
              className="mx-auto my-2"
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt=""
            />

            <p className="font-medium">
              {Math.round(day.main.temp_min)}° /{" "}
              {Math.round(day.main.temp_max)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
