import React, { useEffect, useState } from "react";
import { PieChart } from "./charts/PieChart";

function RightSidebar({ mapRef, onZoom, onZoomAll, onRockyZoneZoom, theme }) {
  const [selectedCritical, setSelectedCritical] = useState("all");
  const [showAll, setShowAll] = useState(true);
  const [selectedRockyZones, setSelectedRockyZones] = useState([]);
  const [rockyZones, setRockyZones] = useState([]);
  const [layersVisibility, setLayersVisibility] = useState({
    area: true,
    roads: true,
    boundary: true,
    hillshade: true,
    newPoints: true,
    allStations: true,
  });

  /* ---------- Styles using direct theme colors ---------- */
  const filterCard = {
    background: theme === "dark" ? "#252525" : "#ffffff",
    border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid #dcdcdc",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "12px",
    boxShadow: theme === "dark" ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.08)",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "6px",
    display: "block",
    color: theme === "dark" ? "#eaeaea" : "#111111",
  };

  const selectStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "8px",
    border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid #dcdcdc",
    backgroundColor: theme === "dark" ? "#252525" : "#ffffff",
    color: theme === "dark" ? "#eaeaea" : "#111111",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
  };

  useEffect(() => {
    // قراءة بيانات الالمناطق الادارية من Disabilities.json
    const fetchRockyZones = async () => {
      try {
        const response = await fetch("/Disabilities.json");
        const data = await response.json();
        
        if (data.features && Array.isArray(data.features)) {
          const zones = data.features.map((feature) => ({
            display: feature.properties['bdata.Name_Ar'] || feature.properties['Name_Ar'] || 'بلا اسم',
            value: feature.properties['bdata.Name_Ar'] || feature.properties['Name_Ar'] || 'unknown'
          }));
          console.log('Loaded zones:', zones);
          setRockyZones(zones);
        }
      } catch (error) {
        console.error("Error fetching rocky zones:", error);
        setRockyZones([]);
      }
    };

    fetchRockyZones();
  }, []);

  function handleCriticalChange(e) {
    const val = e.target.value;
    setSelectedCritical(val);
    if (val === "all") onZoomAll && onZoomAll();
    else onZoom && onZoom(val);
  }

  function handleRockyChange(zoneName) {
    console.log('Toggling zone:', zoneName);
    setShowAll(false); // إلغاء "الكل" عند اختيار منطقة
    setSelectedRockyZones(prev => {
      const isSelected = prev.includes(zoneName);
      const updated = isSelected 
        ? prev.filter(zone => zone !== zoneName)
        : [...prev, zoneName];
      
      console.log('Updated zones:', updated);
      if (onRockyZoneZoom) {
        onRockyZoneZoom(updated, false);
      }
      return updated;
    });
  }

  function handleShowAllChange() {
    const newShowAll = !showAll;
    console.log('Toggle show all:', newShowAll);
    setShowAll(newShowAll);
    setSelectedRockyZones([]);
    
    if (onRockyZoneZoom) {
      onRockyZoneZoom([], newShowAll);
    }
  }

  const handleLayerToggle = (layer) => {
    const newVisibility = !layersVisibility[layer];
    setLayersVisibility(prev => ({ ...prev, [layer]: newVisibility }));

    if (mapRef && mapRef.current && mapRef.current.toggleLayer) {
      mapRef.current.toggleLayer(layer);
    }
  };

  return (
    <div
      style={{
        padding: "12px",
        height: "100%",
        overflowY: "auto",
        background: "transparent",
        color: theme === "dark" ? "#eaeaea" : "#111111",
      }}
    >

      <div style={{ marginBottom: "20px" }}>
     
        <div style={filterCard}>
          <label style={labelStyle}>المناطق الادارية</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* الكل checkbox */}
            <label
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                fontSize: "13px",
                fontWeight: 600,
                paddingBottom: '8px',
                borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #dcdcdc',
                textAlign: 'right'
              }}
            >
              <input
                type="checkbox"
                checked={showAll}
                onChange={handleShowAllChange}
                style={{
                  accentColor: theme === 'dark' ? '#4da3ff' : '#007bff',
                  cursor: 'pointer'
                }}
              />
              الكل
            </label>

            {/* Individual zones */}
            {rockyZones.map((zone, i) => (
              <label
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  fontSize: "13px",
                  textAlign: 'right'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedRockyZones.includes(zone.value)}
                  onChange={() => handleRockyChange(zone.value)}
                  style={{
                    accentColor: theme === 'dark' ? '#4da3ff' : '#007bff',
                    cursor: 'pointer'
                  }}
                />
                {zone.display}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ marginBottom: "20px" }}>
      </div>

      {/* Statistics Pie Chart */}
      <div style={{ 
        marginTop: 12, 
        padding: 10, 
        background: "transparent", 
        borderRadius: 8, 
        border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid #dcdcdc", 
      }}>
<h4 style={{ marginTop: 0, marginBottom: 10, fontSize: 12, fontWeight: 600, color: theme === "dark" ? "#eaeaea" : "#111111", textAlign: 'center', lineHeight: '1.6' }}>  نسبة السكان السعوديين من ذوي الإعاقة المستفيدين من خدمات الوزارة بشكل إجمالي:</h4>        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>          <div style={{ width: '100%' }}>
            <PieChart 
              data={{ 'معاق': 65, 'مستفيد': 35 }} 
              colors={['#ffc107', '#666666']}
              theme={theme}
            />
          </div>
          
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              padding: 6,
              background: "transparent",
              borderRadius: 4,
              justifyContent: 'center'
            }}>
              <div style={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                background: '#ffc107',
                flexShrink: 0
              }}/>
              <div>
                <div style={{ fontSize: 10, color: theme === "dark" ? "#aaaaaa" : "#999" }}>معاق</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: theme === "dark" ? "#eaeaea" : "#111111" }}>2,036,686</div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              padding: 6,
              background: "transparent",
              borderRadius: 4,
              justifyContent: 'center'
            }}>
              <div style={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%',
                background: '#666666',
                flexShrink: 0
              }}/>
              <div>
                <div style={{ fontSize: 10, color: theme === "dark" ? "#aaaaaa" : "#999" }}>مستفيد</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: theme === "dark" ? "#eaeaea" : "#111111" }}>710,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
