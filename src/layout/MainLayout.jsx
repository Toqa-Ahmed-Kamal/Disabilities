import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import MapView from "../components/MapView";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

const NAVBAR_HEIGHT = 60;

function MainLayout() {
  const [showLeft] = useState(true);
  const [showRight] = useState(true);
  const [selectedStationData, setSelectedStationData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 1366);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsCompact(window.innerWidth <= 1366);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column",
      backgroundColor: "var(--bg-primary)",
      color: "var(--text-primary)"
    }}>
      
      {/* Navbar */}
      <div style={{ height: NAVBAR_HEIGHT }}>
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          position: "relative",
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          paddingLeft: showLeft ? 260 : 0,
          paddingRight: showRight ? 260 : 0,
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            top: isMobile ? 10 : 12,
            right: showRight ? 270 : 12,
            zIndex: 40,
            padding: isMobile ? "8px 12px" : isCompact ? "8px 14px" : "10px 20px",
            backgroundColor: "#b69767",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: isMobile ? "12px" : isCompact ? "12px" : "14px",
            minWidth: "auto",
            whiteSpace: "nowrap",
          }}
        >
          ← {isMobile ? "رجوع" : "الرجوع"}
        </button>

        {/* Map */}
        <MapView 
          ref={mapRef} 
          theme={theme} 
          onStationSelect={setSelectedStationData}
        />

        {/* Left Sidebar */}
        {showLeft && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 260,
              height: "100%",
              background: theme === "dark" ? "#1a1a1a" : "#ffffff",
              borderRight: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid #dcdcdc",
              borderRadius: 0,
              boxShadow: theme === "dark" ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.08)",
              zIndex: 20,
              overflow: 'hidden'
            }}
          >
            <LeftSidebar theme={theme} selectedStationData={selectedStationData} />
          </div>
        )}

        {/* Right Sidebar */}
        {showRight && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 260,
              height: "100%",
              background: theme === "dark" ? "#1a1a1a" : "#ffffff",
              borderLeft: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid #dcdcdc",
              borderRadius: 0,
              boxShadow: theme === "dark" ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.08)",
              zIndex: 20,
              overflow: 'hidden'
            }}
          >
            <RightSidebar
              theme={theme}
              mapRef={mapRef}
              onZoom={(name) => mapRef.current && mapRef.current.zoomToFeatureByName && mapRef.current.zoomToFeatureByName(name)}
              onZoomAll={() => mapRef.current && mapRef.current.fitToAll && mapRef.current.fitToAll()}
              onIndicatorLayerToggle={(indicatorName) => {
                if (mapRef.current && mapRef.current.toggleIndicatorLayer) {
                  mapRef.current.toggleIndicatorLayer(indicatorName);
                }
              }}
              onRockyZoneZoom={(zones, showAll) => {
                console.log('onRockyZoneZoom called:', zones, 'showAll:', showAll);
                if (mapRef.current) {
                  console.log('calling mapRef.current.filterByZones with showAll:', showAll);
                  mapRef.current.filterByZones(zones, showAll);
                } else {
                  console.log('mapRef.current is not available');
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainLayout;
