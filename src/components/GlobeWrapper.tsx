"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function GlobeWrapper() {
  return (
    <ErrorBoundary>
      <Globe />
    </ErrorBoundary>
  );
}
