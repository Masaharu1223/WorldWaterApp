import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  it("読み込み中テキストを表示する", () => {
    render(<LoadingSpinner />);
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  it("スピナー要素がレンダリングされる", () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
