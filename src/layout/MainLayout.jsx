import { useState, useRef, useEffect } from "react";
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
  const mapRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

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
