import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("airports")
    .select("*, water_quality(*)");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Supabase returns water_quality as an array (one-to-many relation).
  // For MVP it's 1:1, so unwrap the first element.
  const airports = data.map((airport) => ({
    ...airport,
    water_quality: airport.water_quality?.[0] ?? null,
  }));

  return NextResponse.json(airports);
}
