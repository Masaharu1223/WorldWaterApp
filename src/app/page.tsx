import GlobeWrapper from "@/components/GlobeWrapper";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Header overlay */}
      <div className="absolute top-4 left-4 z-40 pointer-events-none">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">
          Arrival Drink
        </h1>
        <p className="text-sm text-sky-200 drop-shadow">
          世界の空港の水質を探索しよう
        </p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-40 rounded-lg bg-black/60 px-3 py-2 text-xs text-white backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-full bg-blue-500" />
            軟水
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-full bg-yellow-400" />
            中程度
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
            硬水
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
            非常に硬い
          </span>
        </div>
      </div>

      {/* Globe */}
      <GlobeWrapper />
    </main>
  );
}
