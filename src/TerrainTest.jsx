import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function TerrainTest() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [39.94, 21.43], // عدلي لو حابة
      zoom: 10,
      pitch: 0,
      bearing: 0,
      antialias: true
    });

    map.on("load", () => {
      // Terrain removed: map set to 2D for overlaying custom data only
    });

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100vh"
      }}
    />
  );
}

export default TerrainTest;
