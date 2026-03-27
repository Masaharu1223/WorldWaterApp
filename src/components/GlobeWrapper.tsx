"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "./LoadingSpinner";

const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function GlobeWrapper() {
  return <Globe />;
}
