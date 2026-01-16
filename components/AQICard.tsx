
const AQI_MAP: Record<
  number,
  { label: string; color: string; desc: string }
> = {
  1: {
    label: "Good",
    color: "bg-green-500",
    desc: "Air quality is excellent. Ideal for outdoor activities.",
  },
  2: {
    label: "Fair",
    color: "bg-lime-500",
    desc: "Air quality is acceptable. Minor risk for sensitive people.",
  },
  3: {
    label: "Moderate",
    color: "bg-yellow-500",
    desc: "Sensitive groups may experience discomfort.",
  },
  4: {
    label: "Poor",
    color: "bg-orange-500",
    desc: "Breathing may feel uncomfortable. Limit outdoor exposure.",
  },
  5: {
    label: "Very Poor",
    color: "bg-red-600",
    desc: "Serious health risk. Avoid outdoor activities.",
  },
};

export default function AQICard({ aqi }: { aqi: number }) {
  const info = AQI_MAP[aqi];

  return (
    <div className="bg-slate-900/60 p-5 rounded-2xl space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Air Quality</h3>
          <p className="text-sm text-slate-300">
            AQI {aqi}
          </p>
        </div>

        <span
          className={`px-4 py-2 rounded-xl text-sm font-medium ${info.color}`}
        >
          {info.label}
        </span>
      </div>

      {/* AQI Meter */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full transition ${
              level <= aqi
                ? AQI_MAP[level].color
                : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-slate-300">
        {info.desc}
      </p>
    </div>
  );
}
