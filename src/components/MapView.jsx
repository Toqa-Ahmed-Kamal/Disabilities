import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./MapView.css";
import ChartsSection from "./ChartsSection";

const INDICATOR_FIELDS = [
  "عدد الذكور - طيف التوحد",
  "عدد الذكور - متلازمة داون",
  "الذكور - إعاقة بصرية_Count",
  "الذكور - إعاقة سمعية_Count",
  "الذكور - إعاقة حركية_Count",
  "الذكور - فرط الحركة وتشتت الانتباه_Count",
  "عدد الإناث - طيف التوحد",
  "عدد الإناث - متلازمة داون",
  "الإناث - إعاقة بصرية_Count",
  "الإناث - إعاقة سمعية_Count",
  "الإناث - إعاقة حركية_Count",
  "الإناث - فرط الحركة وتشتت الانتباه_Count"
];

const getLayerIdFromIndicator = (indicator) => {
  const safe = indicator
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .toLowerCase();
  return `indicator-${safe}`;
};

const getIndicatorRange = (features, indicator) => {
  const values = features
    .map((feature) => Number(feature?.properties?.[indicator]))
    .filter((value) => Number.isFinite(value));

  if (values.length === 0) {
    return { min: 0, max: 1 };
  }

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

const getChoroplethColorExpression = (indicator, min, max) => {
  if (min === max) {
    return "#b69767";
  }

  const mid = min + (max - min) / 2;

  return [
    "interpolate",
    ["linear"],
    ["coalesce", ["to-number", ["get", indicator]], min],
    min,
    "#f2e6d5",
    mid,
    "#d0b084",
    max,
    "#8f6f42"
  ];
};

const DEFAULT_BASE_FILL_COLOR = "#90EE90";
const DEFAULT_BASE_FILL_OPACITY = 0.35;
const DEFAULT_BASE_LINE_COLOR = "#1B5E20";
const DEFAULT_BASE_LINE_WIDTH = 2.5;

const formatIndicatorName = (indicator) =>
  indicator
    .replace(/Count/g, "عدد")
    .replace(/_/g, " ");

const MapView = forwardRef(function MapView({ 
  theme
}, ref) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const geoDataRef = useRef(null);
  const indicatorLayersRef = useRef({});
  const indicatorStatsRef = useRef({});
  const visibleIndicatorsRef = useRef(new Set());
  const activeZoneFilterRef = useRef(null);
  const [legendInfo, setLegendInfo] = useState(null);











useEffect(() => {
  if (mapRef.current) return;

  const map = new maplibregl.Map({
    container: mapContainer.current,
    style: {
      version: 8,
      sources: {
        "osm-tiles": {
          type: "raster",
          tiles: [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ],
          tileSize: 256
        }
      },
      layers: [{ id: "osm-tiles", type: "raster", source: "osm-tiles" }]
    },
    center: [45.13, 24.82],
    zoom: 4,
    pitch: 0,
    bearing: 0,
    antialias: true,
  });

  mapRef.current = map;

  const applyFilterToAllLayers = (filterExpression) => {
    const targetLayerIds = ["disabilities-fill", "disabilities-outline"];

    Object.values(indicatorLayersRef.current).forEach(({ fillId, outlineId }) => {
      targetLayerIds.push(fillId, outlineId);
    });

    targetLayerIds.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.setFilter(layerId, filterExpression);
      }
    });
  };

  const refreshBaseLayerVisibility = () => {
    const anyIndicatorVisible = visibleIndicatorsRef.current.size > 0;

    if (map.getLayer("disabilities-fill")) {
      map.setLayoutProperty("disabilities-fill", "visibility", anyIndicatorVisible ? "none" : "visible");
      if (!anyIndicatorVisible) {
        map.setPaintProperty("disabilities-fill", "fill-color", DEFAULT_BASE_FILL_COLOR);
        map.setPaintProperty("disabilities-fill", "fill-opacity", DEFAULT_BASE_FILL_OPACITY);
      }
    }
    if (map.getLayer("disabilities-outline")) {
      map.setLayoutProperty("disabilities-outline", "visibility", anyIndicatorVisible ? "none" : "visible");
      if (!anyIndicatorVisible) {
        map.setPaintProperty("disabilities-outline", "line-color", DEFAULT_BASE_LINE_COLOR);
        map.setPaintProperty("disabilities-outline", "line-width", DEFAULT_BASE_LINE_WIDTH);
      }
    }
  };

  const refreshLegend = () => {
    const visibleIndicators = Array.from(visibleIndicatorsRef.current);
    if (visibleIndicators.length === 0) {
      setLegendInfo(null);
      return;
    }

    const activeIndicator = visibleIndicators[visibleIndicators.length - 1];
    const stats = indicatorStatsRef.current[activeIndicator];

    if (!stats) {
      setLegendInfo(null);
      return;
    }

    setLegendInfo({
      indicator: activeIndicator,
      min: stats.min,
      max: stats.max,
    });
  };

  const showFeaturePopup = (event) => {
    if (!event.features || event.features.length === 0) return;

    const props = event.features[0].properties;
    const coordinates = event.lngLat;
    const regionName = props["bdata.Name_Ar"] || props["Name_Ar"] || "المنطقة";

    const keyTranslations = {
      Name_Ar: "الاسم بالعربية",
      Rank: "الترتيب",
      Percent: "النسبة المئوية",
      Count: "العدد",
      "ترتيب الذكور - طيف التوحد": "طيف التوحد - رتبة الذكور",
      "نسبة الذكور - طيف التوحد": "طيف التوحد - نسبة الذكور",
      "عدد الذكور - طيف التوحد": "طيف التوحد - عدد الذكور"
    };

    const translateKeyFunc = (key) => {
      if (keyTranslations[key]) return keyTranslations[key];
      let translated = key;
      translated = translated.replace(/_Rank/g, " - الترتيب");
      translated = translated.replace(/_Percent/g, " - النسبة المئوية");
      translated = translated.replace(/_Count/g, " - العدد");
      return translated;
    };

    const hiddenKeys = [
      "bdata.FID",
      "bdata.Name_Ar",
      "bdata.Name_En",
      "bdata.Area_ID",
      "bdata.Shape_Leng",
      "bdata.Shape_Area",
      "bdata.Code",
      "bdata.Indicator_",
      "bdata.السنة",
      "bdata.القيم",
      "bdata.وحدة_",
      "bdata.Field",
      "Field39"
    ];

    const filteredProps = Object.entries(props).filter(
      ([key, value]) => !hiddenKeys.includes(key) && value !== 0 && value !== "0"
    );

    const popupHTML = `
      <div style="padding: 15px; font-family: Arial, sans-serif; max-width: 500px; max-height: 400px; overflow-y: auto; background: white; border-radius: 8px; text-align: right; direction: rtl;">
        <h3 style="margin: 0 0 15px 0; color: #b69767 !important; font-size: 18px; padding-bottom: 10px; border-bottom: 3px solid #b69767;">${regionName}</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px;">
          ${filteredProps
            .map(
              ([key, value]) => `
              <tr style="border-bottom: none;">
                <td style="color: #b69767 !important; font-weight: 700; padding: 6px 8px; text-align: right;">${translateKeyFunc(key)}:</td>
                <td style="color: #b69767 !important; font-weight: 600; padding: 6px 8px; text-align: right;">${value || "غير محدد"}</td>
              </tr>
            `
            )
            .join("")}
        </table>
      </div>
    `;

    new maplibregl.Popup({
      offset: [0, -50],
      closeButton: true,
      closeOnClick: true,
      maxWidth: "500px"
    })
      .setLngLat(coordinates)
      .setHTML(popupHTML)
      .addTo(map);
  };

  const registerLayerInteractivity = (layerId) => {
    map.on("click", layerId, showFeaturePopup);
    map.on("mouseenter", layerId, () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", layerId, () => {
      map.getCanvas().style.cursor = "";
    });
  };

  const getBoundsForFeatures = (features) => {
    const bounds = [Infinity, Infinity, -Infinity, -Infinity];

    const includeCoord = (coord) => {
      bounds[0] = Math.min(bounds[0], coord[0]);
      bounds[1] = Math.min(bounds[1], coord[1]);
      bounds[2] = Math.max(bounds[2], coord[0]);
      bounds[3] = Math.max(bounds[3], coord[1]);
    };

    features.forEach((feature) => {
      const geometry = feature?.geometry;
      if (!geometry) return;

      if (geometry.type === "Polygon") {
        geometry.coordinates.forEach((ring) => ring.forEach(includeCoord));
      }

      if (geometry.type === "MultiPolygon") {
        geometry.coordinates.forEach((polygon) => {
          polygon.forEach((ring) => ring.forEach(includeCoord));
        });
      }
    });

    if (bounds[0] === Infinity) return null;
    return bounds;
  };

  map.once("load", () => {
    fetch("/Disabilities.json")
      .then((response) => response.json())
      .then((disabilitiesData) => {
        geoDataRef.current = disabilitiesData;

        map.addSource("disabilities", {
          type: "geojson",
          data: disabilitiesData
        });

        map.addLayer({
          id: "disabilities-fill",
          type: "fill",
          source: "disabilities",
          paint: {
            "fill-color": DEFAULT_BASE_FILL_COLOR,
            "fill-opacity": DEFAULT_BASE_FILL_OPACITY
          }
        });

        map.addLayer({
          id: "disabilities-outline",
          type: "line",
          source: "disabilities",
          paint: {
            "line-color": DEFAULT_BASE_LINE_COLOR,
            "line-width": DEFAULT_BASE_LINE_WIDTH
          }
        });

        const features = disabilitiesData?.features || [];

        INDICATOR_FIELDS.forEach((indicator) => {
          const { min, max } = getIndicatorRange(features, indicator);
          indicatorStatsRef.current[indicator] = { min, max };
          const baseLayerId = getLayerIdFromIndicator(indicator);
          const fillId = `${baseLayerId}-fill`;
          const outlineId = `${baseLayerId}-outline`;

          map.addLayer({
            id: fillId,
            type: "fill",
            source: "disabilities",
            layout: {
              visibility: "none"
            },
            paint: {
              "fill-color": getChoroplethColorExpression(indicator, min, max),
              "fill-opacity": 0.55
            }
          });

          map.addLayer({
            id: outlineId,
            type: "line",
            source: "disabilities",
            layout: {
              visibility: "none"
            },
            paint: {
              "line-color": "#6f5836",
              "line-width": 1.2
            }
          });

          indicatorLayersRef.current[indicator] = { fillId, outlineId };
          registerLayerInteractivity(fillId);
        });

        registerLayerInteractivity("disabilities-fill");

        map.filterByZones = (zones, showAll) => {
          if (showAll) {
            activeZoneFilterRef.current = null;
            applyFilterToAllLayers(null);
            map.flyTo({ center: [45.13, 24.82], zoom: 4, duration: 1000 });
            return;
          }

          if (zones.length > 0) {
            const filter = [
              "in",
              ["coalesce", ["get", "bdata.Name_Ar"], ["get", "Name_Ar"], ""],
              ["literal", zones]
            ];
            activeZoneFilterRef.current = filter;
            applyFilterToAllLayers(filter);

            const selectedFeatures = (geoDataRef.current?.features || []).filter((feature) => {
              const zoneName = feature?.properties?.["bdata.Name_Ar"] || feature?.properties?.["Name_Ar"];
              return zones.includes(zoneName);
            });

            const bounds = getBoundsForFeatures(selectedFeatures);
            if (bounds) {
              map.fitBounds(bounds, { padding: 40, duration: 1000 });
            }
            return;
          }

          const emptyFilter = [
            "in",
            ["coalesce", ["get", "bdata.Name_Ar"], ["get", "Name_Ar"], ""],
            ["literal", []]
          ];
          activeZoneFilterRef.current = emptyFilter;
          applyFilterToAllLayers(emptyFilter);
        };

        map.toggleIndicatorLayer = (indicatorName) => {
          const layerConfig = indicatorLayersRef.current[indicatorName];
          if (!layerConfig) return;

          const { fillId, outlineId } = layerConfig;
          if (!map.getLayer(fillId) || !map.getLayer(outlineId)) return;

          const isVisible = map.getLayoutProperty(fillId, "visibility") !== "none";
          const nextVisibility = isVisible ? "none" : "visible";

          map.setLayoutProperty(fillId, "visibility", nextVisibility);
          map.setLayoutProperty(outlineId, "visibility", nextVisibility);

          if (nextVisibility === "visible") {
            visibleIndicatorsRef.current.delete(indicatorName);
            visibleIndicatorsRef.current.add(indicatorName);
          } else {
            visibleIndicatorsRef.current.delete(indicatorName);
          }

          if (activeZoneFilterRef.current !== null) {
            map.setFilter(fillId, activeZoneFilterRef.current);
            map.setFilter(outlineId, activeZoneFilterRef.current);
          }

          refreshBaseLayerVisibility();
          refreshLegend();
        };
      })
      .catch((error) => console.error("Error loading Disabilities.json:", error));
  });

  return () => {
    map.remove();
    mapRef.current = null;
    geoDataRef.current = null;
    indicatorLayersRef.current = {};
    indicatorStatsRef.current = {};
    visibleIndicatorsRef.current = new Set();
    activeZoneFilterRef.current = null;
    setLegendInfo(null);
  };
}, []);

// Expose filterByZones method via ref
useImperativeHandle(ref, () => {
  return {
    filterByZones: (zones, showAll) => {
      if (mapRef.current && mapRef.current.filterByZones) {
        mapRef.current.filterByZones(zones, showAll);
      }
    },
    toggleIndicatorLayer: (indicatorName) => {
      if (mapRef.current && mapRef.current.toggleIndicatorLayer) {
        mapRef.current.toggleIndicatorLayer(indicatorName);
      }
    }
  };
}, []);






  return (
    <div className="map-view-container">
      <div className="map-view-top">
        <div
          ref={mapContainer}
          className="map-container"
        />

        {legendInfo && (
          <div
            style={{
              position: "absolute",
              left: 12,
              bottom: 12,
              zIndex: 30,
              background: theme === "dark" ? "rgba(22,22,22,0.95)" : "rgba(255,255,255,0.95)",
              border: theme === "dark" ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.12)",
              borderRadius: 8,
              padding: "8px 10px",
              minWidth: 190,
              direction: "rtl",
              textAlign: "right",
              boxShadow: theme === "dark" ? "0 2px 10px rgba(0,0,0,0.45)" : "0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: theme === "dark" ? "#f0e2c9" : "#6f5836",
                marginBottom: 6,
              }}
            >
              {formatIndicatorName(legendInfo.indicator)}
            </div>

            <div
              style={{
                height: 10,
                borderRadius: 999,
                background:
                  theme === "dark"
                    ? "linear-gradient(to left, #c8a46a, #8e6d40, #4d3a22)"
                    : "linear-gradient(to left, #8f6f42, #d0b084, #f2e6d5)",
                border: theme === "dark" ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.1)",
              }}
            />

            <div
              style={{
                marginTop: 5,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: theme === "dark" ? "#f0e2c9" : "#6f5836",
                fontWeight: 700,
                direction: "ltr",
              }}
            >
              <span>{Math.round(legendInfo.max)}</span>
              <span>{Math.round(legendInfo.min)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="map-view-bottom">
        <ChartsSection theme={theme} />
      </div>
    </div>
  );
});

export default MapView;
