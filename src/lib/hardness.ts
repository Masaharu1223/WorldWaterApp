import { HardnessLevel } from "./types";

interface HardnessConfig {
  label: string;
  rgb: [number, number, number];
  twColor: string;
  twBg: string;
  twBgSolid: string;
}

export const HARDNESS_CONFIG: Record<HardnessLevel, HardnessConfig> = {
  soft: {
    label: "軟水",
    rgb: [66, 135, 245],
    twColor: "text-blue-300",
    twBg: "bg-blue-500/30",
    twBgSolid: "bg-blue-500",
  },
  moderate: {
    label: "中程度",
    rgb: [245, 200, 66],
    twColor: "text-yellow-300",
    twBg: "bg-yellow-500/30",
    twBgSolid: "bg-yellow-400",
  },
  hard: {
    label: "硬水",
    rgb: [245, 140, 66],
    twColor: "text-orange-300",
    twBg: "bg-orange-500/30",
    twBgSolid: "bg-orange-500",
  },
  very_hard: {
    label: "非常に硬い",
    rgb: [245, 66, 66],
    twColor: "text-red-300",
    twBg: "bg-red-500/30",
    twBgSolid: "bg-red-500",
  },
};
