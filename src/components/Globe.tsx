"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Cartesian2 as Cartesian2Type, Viewer as ViewerType } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { CESIUM_ION_TOKEN, CESIUM_BASE_URL } from "@/lib/cesium-config";
import { AirportWithWater, HardnessLevel } from "@/lib/types";
import AirportDetail from "./AirportDetail";
import LoadingSpinner from "./LoadingSpinner";

const hardnessColors: Record<HardnessLevel, [number, number, number]> = {
  soft: [66, 135, 245], // blue
  moderate: [245, 200, 66], // yellow
  hard: [245, 140, 66], // orange
  very_hard: [245, 66, 66], // red
};

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<ViewerType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAirport, setSelectedAirport] =
    useState<AirportWithWater | null>(null);
  const [hoveredAirport, setHoveredAirport] = useState<{
    airport: AirportWithWater;
    x: number;
    y: number;
  } | null>(null);

  const handleClose = useCallback(() => {
    const viewer = viewerRef.current;
    if (viewer) {
      // Zoom back out to default view
      import("cesium").then((Cesium) => {
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(0, 20, 20_000_000),
          duration: 1.5,
        });
      });
    }
    setSelectedAirport(null);
  }, []);

  useEffect(() => {
    let destroyed = false;

    async function init() {
      const Cesium = await import("cesium");

      if (destroyed || !containerRef.current) return;

      // Configure Cesium
      (window as unknown as Record<string, unknown>).CESIUM_BASE_URL =
        CESIUM_BASE_URL;
      Cesium.Ion.defaultAccessToken = CESIUM_ION_TOKEN;

      // Create viewer
      const viewer = new Cesium.Viewer(containerRef.current, {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        creditContainer: document.createElement("div"),
      });

      viewerRef.current = viewer;

      // Enable globe atmosphere
      viewer.scene.globe.enableLighting = true;

      // Fetch airport data
      try {
        const res = await fetch("/api/airports");
        const airports: AirportWithWater[] = await res.json();

        if (destroyed) return;

        // Add pins for each airport
        for (const airport of airports) {
          const wq = airport.water_quality;
          const color = wq
            ? hardnessColors[wq.hardness_level]
            : [150, 150, 150];

          viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(
              airport.longitude,
              airport.latitude,
              0
            ),
            point: {
              pixelSize: 10,
              color: new Cesium.Color(
                color[0] / 255,
                color[1] / 255,
                color[2] / 255,
                1.0
              ),
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 2,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
            label: {
              text: airport.iata_code,
              font: "12px sans-serif",
              fillColor: Cesium.Color.WHITE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 2,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -14),
              distanceDisplayCondition:
                new Cesium.DistanceDisplayCondition(0, 8_000_000),
            },
            properties: {
              airportData: airport,
            },
          });
        }
      } catch {
        console.error("Failed to fetch airport data");
      }

      // Click handler — fly to airport then show detail overlay
      const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(
        (event: { position: Cartesian2Type }) => {
          const picked = viewer.scene.pick(event.position);
          if (Cesium.defined(picked) && picked.id?.properties) {
            const airportData = picked.id.properties.airportData?.getValue(
              Cesium.JulianDate.now()
            );
            if (airportData) {
              setHoveredAirport(null);

              // Fly to the airport location
              viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(
                  airportData.longitude,
                  airportData.latitude,
                  500_000
                ),
                orientation: {
                  heading: 0,
                  pitch: Cesium.Math.toRadians(-45),
                  roll: 0,
                },
                duration: 2,
                complete: () => {
                  // Show detail overlay after zoom completes
                  setSelectedAirport(airportData);
                },
              });
            }
          }
        },
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );

      // Hover handler
      handler.setInputAction(
        (event: { endPosition: Cartesian2Type }) => {
          const picked = viewer.scene.pick(event.endPosition);
          if (Cesium.defined(picked) && picked.id?.properties) {
            const airportData = picked.id.properties.airportData?.getValue(
              Cesium.JulianDate.now()
            );
            if (airportData) {
              setHoveredAirport({
                airport: airportData,
                x: event.endPosition.x,
                y: event.endPosition.y,
              });
              viewer.scene.canvas.style.cursor = "pointer";
              return;
            }
          }
          setHoveredAirport(null);
          viewer.scene.canvas.style.cursor = "default";
        },
        Cesium.ScreenSpaceEventType.MOUSE_MOVE
      );

      setLoading(false);
    }

    init();

    return () => {
      destroyed = true;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 z-10">
          <LoadingSpinner />
        </div>
      )}
      <div ref={containerRef} className="h-full w-full" />
      {hoveredAirport && !selectedAirport && (
        <div
          className="pointer-events-none absolute z-50 rounded-lg bg-black/80 px-3 py-2 text-sm text-white backdrop-blur-sm"
          style={{
            left: hoveredAirport.x + 16,
            top: hoveredAirport.y - 16,
          }}
        >
          <p className="font-bold">
            {hoveredAirport.airport.iata_code} -{" "}
            {hoveredAirport.airport.name}
          </p>
          <p className="text-sky-300">
            {hoveredAirport.airport.city}, {hoveredAirport.airport.country}
          </p>
        </div>
      )}
      {selectedAirport && (
        <AirportDetail airport={selectedAirport} onClose={handleClose} />
      )}
    </div>
  );
}
