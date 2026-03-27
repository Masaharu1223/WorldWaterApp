"use client";

import { useState } from "react";
import { AirportWithWater, HardnessLevel } from "@/lib/types";

interface Props {
  airport: AirportWithWater;
  onClose: () => void;
}

const hardnessConfig: Record<
  HardnessLevel,
  { label: string; color: string; bgColor: string }
> = {
  soft: { label: "軟水", color: "text-blue-300", bgColor: "bg-blue-500/30" },
  moderate: {
    label: "中程度",
    color: "text-yellow-300",
    bgColor: "bg-yellow-500/30",
  },
  hard: {
    label: "硬水",
    color: "text-orange-300",
    bgColor: "bg-orange-500/30",
  },
  very_hard: {
    label: "非常に硬い",
    color: "text-red-300",
    bgColor: "bg-red-500/30",
  },
};

export default function AirportDetail({ airport, onClose }: Props) {
  const [closing, setClosing] = useState(false);
  const wq = airport.water_quality;
  const config = wq ? hardnessConfig[wq.hardness_level] : null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${
        closing ? "opacity-0" : "animate-fadeIn"
      }`}
    >
      {/* Background image */}
      {airport.image_url ? (
        <img
          src={airport.image_url}
          alt={`${airport.city}, ${airport.country}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
      )}

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
        {/* Airport header */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-widest text-sky-400">
            {airport.iata_code}
          </p>
          <h1 className="mt-1 text-4xl font-bold text-white md:text-5xl">
            {airport.name}
          </h1>
          <p className="mt-2 text-xl text-white/70">
            {airport.city}, {airport.country}
          </p>
        </div>

        {/* Water quality card */}
        {wq ? (
          <div className="max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-md">
            <h2 className="mb-4 text-lg font-semibold text-white">水質情報</h2>

            {/* Hardness badge + value */}
            <div className="mb-3 flex items-center gap-3">
              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold ${config!.bgColor} ${config!.color}`}
              >
                {config!.label}
              </span>
              <span className="text-white/60">{wq.hardness_mg_l} mg/L</span>
            </div>

            {/* Drinkable */}
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">
                {wq.is_drinkable ? "✅" : "⚠️"}
              </span>
              <span className="text-white/90">
                {wq.is_drinkable
                  ? "水道水は飲用可能"
                  : "水道水の飲用は推奨されません"}
              </span>
            </div>

            {/* Taste note */}
            {wq.taste_note && (
              <div className="mb-2">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  味の特徴
                </p>
                <p className="text-sm text-white/80">{wq.taste_note}</p>
              </div>
            )}

            {/* Source note */}
            {wq.source_note && (
              <div className="mb-2">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  水源情報
                </p>
                <p className="text-sm text-white/80">{wq.source_note}</p>
              </div>
            )}

            {/* Last verified */}
            {wq.last_verified && (
              <p className="mt-3 text-xs text-white/30">
                最終確認: {wq.last_verified}
              </p>
            )}
          </div>
        ) : (
          <div className="max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-md">
            <p className="text-white/60">水質データがありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
