"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import AQICard from "@/components/AQICard";
import Forecast from "@/components/Forecast";
import AIInsight from "@/components/AIInsight";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { LocationResult } from "@/types/location";
import {
  fetchWeatherByCoords,
  fetchForecastByCoords,
  fetchAQI,
} from "@/lib/weather";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [aqi, setAqi] = useState<number | null>(null);
  const [recent, setRecent] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [userCoords, setUserCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  /* 🔍 Handle location selection (search, enter key, recent) */
  const handleLocationSelect = async (loc: LocationResult) => {
    setLoading(true);
    try {
      const w = await fetchWeatherByCoords(loc.lat, loc.lon);
      setWeather(w.data);

      const f = await fetchForecastByCoords(loc.lat, loc.lon);
      setForecast(f.data.list);

      const a = await fetchAQI(loc.lat, loc.lon);
      setAqi(a.data.list[0].main.aqi);

      // Save recent searches
      setRecent((prev) => {
        const updated = [
          loc,
          ...prev.filter(
            (p) => p.lat !== loc.lat || p.lon !== loc.lon
          ),
        ];
        const sliced = updated.slice(0, 5);
        localStorage.setItem(
          "recentLocations",
          JSON.stringify(sliced)
        );
        return sliced;
      });
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  /* 📍 Auto-detect user location on first load */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setLoading(true);
        try {
          const { latitude, longitude } = pos.coords;

          setUserCoords({
            lat: latitude,
            lon: longitude,
          });

          const w = await fetchWeatherByCoords(latitude, longitude);
          setWeather(w.data);

          const f = await fetchForecastByCoords(latitude, longitude);
          setForecast(f.data.list);

          const a = await fetchAQI(latitude, longitude);
          setAqi(a.data.list[0].main.aqi);
        } finally {
          setLoading(false);
        }
      },
      () => console.warn("Location access denied")
    );
  }, []);

  /* 🕘 Load recent searches from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("recentLocations");
    if (saved) setRecent(JSON.parse(saved));
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">
      <div className="w-full max-w-5xl px-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 space-y-8">

          {/* 🔍 Global search with Enter-key + nearby priority */}
          <SearchBar
            onSelect={handleLocationSelect}
            userCoords={userCoords ?? undefined}
          />

          {/* 🕘 Recent searches */}
          {recent.length > 0 && (
            <div className="flex gap-2 flex-wrap justify-center text-sm">
              {recent.map((loc, i) => (
                <button
                  key={i}
                  onClick={() => handleLocationSelect(loc)}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  {loc.name}, {loc.country}
                </button>
              ))}
            </div>
          )}

          {/* ⏳ Loading skeleton */}
          {loading && <WeatherSkeleton />}

          {/* 🌦 Weather content */}
          {!loading && weather && (
            <>
              <WeatherCard data={weather} />
              {aqi !== null && <AQICard aqi={aqi} />}
              <Forecast list={forecast} />
              <AIInsight
                weather={weather.weather[0].description}
                aqi={aqi}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
