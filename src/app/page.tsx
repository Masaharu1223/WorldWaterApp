import GlobeWrapper from "@/components/GlobeWrapper";
import { HARDNESS_CONFIG } from "@/lib/hardness";

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
          {Object.values(HARDNESS_CONFIG).map((config) => (
            <span key={config.label} className="flex items-center gap-1">
              <span
                className={`inline-block h-3 w-3 rounded-full ${config.twBgSolid}`}
              />
              {config.label}
            </span>
          ))}
        </div>
      </div>

      {/* Globe */}
      <GlobeWrapper />
    </main>
  );
}
