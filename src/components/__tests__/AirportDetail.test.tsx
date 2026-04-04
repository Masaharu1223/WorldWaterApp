import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AirportDetail from "../AirportDetail";
import { AirportWithWater } from "@/lib/types";

const baseAirport: AirportWithWater = {
  id: "1",
  iata_code: "HND",
  name: "羽田空港",
  city: "東京",
  country: "日本",
  latitude: 35.5494,
  longitude: 139.7798,
  image_url: null,
  water_quality: {
    id: "wq1",
    airport_id: "1",
    hardness_mg_l: 60,
    hardness_level: "soft",
    is_drinkable: true,
    taste_note: "まろやかな味",
    source_note: "多摩川水系",
    last_verified: "2024-01-01",
  },
};

describe("AirportDetail", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("空港名・都市・国・IATAコードを表示する", () => {
    render(<AirportDetail airport={baseAirport} onClose={() => {}} />);

    expect(screen.getByText("羽田空港")).toBeInTheDocument();
    expect(screen.getByText("東京, 日本")).toBeInTheDocument();
    expect(screen.getByText("HND")).toBeInTheDocument();
  });

  it("水質情報（硬度・飲用可否・味・水源）を表示する", () => {
    render(<AirportDetail airport={baseAirport} onClose={() => {}} />);

    expect(screen.getByText("軟水")).toBeInTheDocument();
    expect(screen.getByText("60 mg/L")).toBeInTheDocument();
    expect(screen.getByText("水道水は飲用可能")).toBeInTheDocument();
    expect(screen.getByText("まろやかな味")).toBeInTheDocument();
    expect(screen.getByText("多摩川水系")).toBeInTheDocument();
    expect(screen.getByText("最終確認: 2024-01-01")).toBeInTheDocument();
  });

  it("飲用不可の空港で警告メッセージを表示する", () => {
    const airport = {
      ...baseAirport,
      water_quality: { ...baseAirport.water_quality!, is_drinkable: false },
    };

    render(<AirportDetail airport={airport} onClose={() => {}} />);
    expect(screen.getByText("水道水の飲用は推奨されません")).toBeInTheDocument();
  });

  it("硬水レベルに応じたラベルを表示する", () => {
    const cases: Array<[AirportWithWater["water_quality"], string]> = [
      [{ ...baseAirport.water_quality!, hardness_level: "moderate" }, "中程度"],
      [{ ...baseAirport.water_quality!, hardness_level: "hard" }, "硬水"],
      [{ ...baseAirport.water_quality!, hardness_level: "very_hard" }, "非常に硬い"],
    ];

    for (const [wq, label] of cases) {
      const { unmount } = render(
        <AirportDetail airport={{ ...baseAirport, water_quality: wq }} onClose={() => {}} />
      );
      expect(screen.getByText(label)).toBeInTheDocument();
      unmount();
    }
  });

  it("水質データが null のとき「データなし」メッセージを表示する", () => {
    render(
      <AirportDetail airport={{ ...baseAirport, water_quality: null }} onClose={() => {}} />
    );
    expect(screen.getByText("水質データがありません")).toBeInTheDocument();
  });

  it("閉じるボタンクリック後に onClose が呼ばれる", async () => {
    const onClose = vi.fn();
    render(<AirportDetail airport={baseAirport} onClose={onClose} />);

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    // アニメーション完了まで待つ（400ms）
    await act(async () => {
      vi.advanceTimersByTime(400);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("image_url がある場合、背景画像を表示する", () => {
    const airport = { ...baseAirport, image_url: "https://example.com/hnd.jpg" };
    render(<AirportDetail airport={airport} onClose={() => {}} />);

    const img = screen.getByAltText("東京, 日本");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/hnd.jpg");
  });
});
