import { format } from "date-fns";

type ForecastItem = {
  dt: number;
  main: { temp: number };
  weather: { icon: string }[];
};

export default function Forecast({ list }: { list: ForecastItem[] }) {
  // 1️⃣ Group by date
  const dailyMap: Record<string, ForecastItem[]> = {};

  list.forEach((item) => {
    const date = format(new Date(item.dt * 1000), "yyyy-MM-dd");
    if (!dailyMap[date]) dailyMap[date] = [];
    dailyMap[date].push(item);
  });

  // 2️⃣ Convert to daily forecast
  const dailyForecast = Object.entries(dailyMap)
    .slice(0, 5)
    .map(([date, items]) => {
      const temps = items.map((i) => i.main.temp);

      return {
        day: format(new Date(date), "EEE"),
        min: Math.min(...temps),
        max: Math.max(...temps),
        icon: items[Math.floor(items.length / 2)].weather[0].icon,
      };
    });

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {dailyForecast.map((day, i) => (
          <div
            key={i}
            className="bg-white/5 rounded-2xl p-4 text-center"
          >
            <p className="mb-2">{day.day}</p>

            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt=""
              className="mx-auto"
            />

            <p className="mt-2 font-medium">
              {Math.round(day.min)}° / {Math.round(day.max)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
