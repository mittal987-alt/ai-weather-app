export default function WeatherSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-24 bg-white/10 rounded-xl" />
      <div className="h-16 bg-white/10 rounded-xl" />
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-28 bg-white/10 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
