"use client";

import { useState } from "react";

export default function AIInsight({
  weather,
  aqi,
}: {
  weather: string;
  aqi: number;
}) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetInsight = async () => {
    const cacheKey = `ai-${weather}-${aqi}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      setInsight(cached);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weather, aqi }),
      });

      const data = await res.json();
      setInsight(data.insight);
      localStorage.setItem(cacheKey, data.insight);
    } catch (err) {
      setInsight("AI insight unavailable right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/60 p-6 rounded-2xl space-y-4">
      <h3 className="text-xl font-semibold">
        🧠 AI Weather Insight
      </h3>

      {!insight && (
        <button
          onClick={handleGetInsight}
          className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
        >
          {loading ? "Loading..." : "Get AI Insight"}
        </button>
      )}

      {insight && (
        <p className="text-slate-200 whitespace-pre-line">
          {insight}
        </p>
      )}
    </div>
  );
}
