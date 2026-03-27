export type HardnessLevel = "soft" | "moderate" | "hard" | "very_hard";

export interface WaterQuality {
  id: string;
  airport_id: string;
  hardness_mg_l: number;
  hardness_level: HardnessLevel;
  is_drinkable: boolean;
  taste_note: string | null;
  source_note: string | null;
  last_verified: string | null;
}

export interface Airport {
  id: string;
  iata_code: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  image_url: string | null;
}

export interface AirportWithWater extends Airport {
  water_quality: WaterQuality | null;
}
