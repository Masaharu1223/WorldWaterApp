import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the supabase module before importing the route
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

import { supabase } from "@/lib/supabase";
import { GET } from "../route";

const mockFrom = supabase.from as ReturnType<typeof vi.fn>;

describe("GET /api/airports", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("水質データ付きの空港リストを返す", async () => {
    const rawData = [
      {
        id: "1",
        iata_code: "HND",
        name: "羽田空港",
        city: "東京",
        country: "日本",
        latitude: 35.5494,
        longitude: 139.7798,
        image_url: null,
        water_quality: [
          {
            id: "wq1",
            airport_id: "1",
            hardness_mg_l: 60,
            hardness_level: "soft",
            is_drinkable: true,
            taste_note: "まろやかな味",
            source_note: "多摩川水系",
            last_verified: "2024-01-01",
            created_at: "2024-01-01T00:00:00Z",
          },
        ],
      },
    ];

    mockFrom.mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: rawData, error: null }),
    });

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toHaveLength(1);
    // water_quality は配列から単一オブジェクトに展開されること
    expect(json[0].water_quality).toEqual(rawData[0].water_quality[0]);
    expect(json[0].iata_code).toBe("HND");
  });

  it("水質データがない空港は water_quality が null になる", async () => {
    const rawData = [
      {
        id: "2",
        iata_code: "NRT",
        name: "成田国際空港",
        city: "成田",
        country: "日本",
        latitude: 35.7647,
        longitude: 140.3864,
        image_url: null,
        water_quality: [],
      },
    ];

    mockFrom.mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: rawData, error: null }),
    });

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json[0].water_quality).toBeNull();
  });

  it("Supabase エラー時に 500 とエラーメッセージを返す", async () => {
    mockFrom.mockReturnValue({
      select: vi.fn().mockResolvedValue({
        data: null,
        error: { message: "DB connection failed" },
      }),
    });

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toEqual({ error: "DB connection failed" });
  });
});
