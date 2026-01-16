"use client";

import { useEffect, useState } from "react";
import { searchLocation } from "@/lib/weather";
import { LocationResult } from "@/types/location";

export default function SearchBar({
  onSelect,
  userCoords,
}: {
  onSelect: (loc: LocationResult) => void;
  userCoords?: { lat: number; lon: number };
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchLocation(query);
        let data: LocationResult[] = res.data;

        // 📍 FEATURE 2: Prioritize nearby locations
        if (userCoords) {
          data = data.sort(
            (a, b) =>
              distance(a, userCoords) -
              distance(b, userCoords)
          );
        }

        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, userCoords]);

  // ⌨️ Enter key handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0) {
      onSelect(results[0]);
      setQuery(
        `${results[0].name}, ${results[0].country}`
      );
      setResults([]);
    }
  };

  return (
    <div className="relative max-w-md mx-auto w-full">
      <input
        className="w-full bg-slate-900/70 backdrop-blur-xl px-5 py-4 rounded-2xl outline-none text-lg placeholder:text-slate-400"
        placeholder="Search any location…"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value.toLowerCase())
        }
        onKeyDown={handleKeyDown}
      />

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-slate-900 rounded-xl shadow-xl overflow-hidden">
          {results.map((loc, i) => (
            <button
              key={i}
              onClick={() => {
                onSelect(loc);
                setQuery(
                  `${loc.name}${loc.state ? ", " + loc.state : ""}, ${loc.country}`
                );
                setResults([]);
              }}
              className="block w-full text-left px-4 py-3 hover:bg-slate-800 transition"
            >
              {loc.name}
              {loc.state && `, ${loc.state}`} — {loc.country}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <p className="absolute right-4 top-4 text-xs text-slate-400">
          searching…
        </p>
      )}
    </div>
  );
}

/* 📐 Distance helper (Haversine-lite) */
function distance(
  loc: LocationResult,
  user: { lat: number; lon: number }
) {
  return Math.hypot(loc.lat - user.lat, loc.lon - user.lon);
}
