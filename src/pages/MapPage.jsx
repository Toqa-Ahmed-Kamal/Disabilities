import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import CareCentersData from "./Carecenters.json";
import AlMadinahData from "../../Al-Madinah.json";

// Fix default marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
});

const careCenterIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map zoom
const MapZoomController = ({ selectedCenter, markersRef }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedCenter && markersRef.current[selectedCenter.index]) {
      const marker = markersRef.current[selectedCenter.index];
      const lat = marker.getLatLng().lat;
      const lng = marker.getLatLng().lng;
      map.flyTo([lat, lng], 12, { duration: 1.5 });
      marker.openPopup();
    }
  }, [selectedCenter, map]);

  return null;
};

const MapPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedCenter, setSelectedCenter] = useState(null);
  const markersRef = useRef({});

  const keyTranslations = {
    name: "الاسم",
    address: "العنوان",
    capacity: "السعة",
    beneficiaries: "الفئات المستفيدة",
    coverage: "التغطية",
    sector_type: "نوع القطاع",
    center_type: "نوع المركز",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    website: "الموقع الإلكتروني",
    status: "الحالة",
    Name_ar: "الاسم بالعربية",
    market_share: "حصة السوق",
    gender_served: "الفئة المستهدفة",
    "Rank": "الترتيب",
    "Percent": "النسبة المئوية",
    "Count": "العدد"
  };

  const translateKey = (key) => {
    if (keyTranslations[key]) return keyTranslations[key];
    let translated = key;
    translated = translated.replace(/_Rank/g, ' - الترتيب');
    translated = translated.replace(/_Percent/g, ' - النسبة المئوية');
    translated = translated.replace(/_Count/g, ' - العدد');
    return translated;
  };
  
  // المدينة المنورة
  const madinahCoordinates = [24.4672, 39.6141];

  // Style للـ polygons من Al-Madinah
  const polygonStyle = {
    color: "#b69767",
    weight: 2,
    opacity: 0.7,
    fillColor: "#d4a574",
    fillOpacity: 0.3
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      let popupContent = `<div style="text-align: right; direction: rtl; background-color: #ffffff; padding: 10px;">`;
      for (const [key, value] of Object.entries(feature.properties)) {
        // إخفاء الـ technical keys وتصفية القيم الصفرية
        if (!key.startsWith("Arabie_saoudite_Muhafazat_Boundaries.") && !key.startsWith("Unnamed:") && value !== 0 && value !== "0") {
          const translatedKey = translateKey(key);
          popupContent += `<p style="margin: 8px 0; font-size: 13px; text-align: right;"><strong style="color: #b69767 !important; font-weight: 700;">${translatedKey}:</strong> <span style="color: #b69767 !important; font-weight: 700;">${value}</span></p>`;
        }
      }
      popupContent += '</div>';
      layer.bindPopup(popupContent);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{
        padding: "15px 20px",
        backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
        borderBottom: `1px solid ${theme === "dark" ? "#333" : "#eee"}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100
      }}>
        <button 
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#b69767",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          ← الرجوع للرئيسية
        </button>
        <h1 style={{ color: theme === "dark" ? "#fff" : "#000", margin: 0 }}>
        خريطة المدينة المنورة
        </h1>
        <div style={{ width: "150px" }}></div>
      </header>

      {/* Main Container */}
      <div style={{ flex: 1, display: "flex", gap: 0 }}>
        {/* Left Sidebar - 20% */}
        <div style={{
          width: "30%",
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#f9f9f9",
          borderRight: `1px solid ${theme === "dark" ? "#333" : "#ddd"}`,
          padding: "20px",
          overflowY: "auto",
          color: theme === "dark" ? "#fff" : "#000",
          direction: "rtl",
          textAlign: "right"
        }}>
          <h2 style={{ fontSize: "18px", marginTop: 0, textAlign: "center" }}>معلومات</h2>
          
  

          {/* جدول البيانات */}
          <div style={{
            backgroundColor: theme === "dark" ? "#2a2a2a" : "#f0f0f0",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "15px"
          }}>
            <h3 style={{ color: "#b69767", marginBottom: "15px", fontSize: "16px" }}>بيانات المحافظات</h3>
            <div style={{ overflowX: "auto", fontSize: "11px" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                direction: "rtl"
              }}>
                <thead>
                  <tr style={{ backgroundColor: theme === "dark" ? "#1a1a1a" : "#e8e8e8", borderBottom: "2px solid #b69767" }}>
                    <th style={{ padding: "8px", textAlign: "right", color: "#b69767", fontWeight: "700" }}>المحافظة</th>
                    <th style={{ padding: "8px", textAlign: "right", color: "#b69767", fontWeight: "700" }}>مراكز</th>
                    <th style={{ padding: "8px", textAlign: "right", color: "#b69767", fontWeight: "700" }}>الفجوة</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { city: "المدينة المنورة", centers: 12, gap: "69%" },
                    { city: "ينبع البحر", centers: 2, gap: "60%" },
                    { city: "العلا", centers: 1, gap: "47%" },
                    { city: "المهد", centers: 0, gap: "100%" },
                    { city: "بدر", centers: 1, gap: "44%" },
                    { city: "خيبر", centers: 1, gap: "68%" },
                    { city: "الحناكية", centers: 0, gap: "100%" }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: `1px solid ${theme === "dark" ? "#3a3a3a" : "#ddd"}` }}>
                      <td style={{ padding: "6px", textAlign: "right", color: theme === "dark" ? "#ddd" : "#333" }}>{row.city}</td>
                      <td style={{ padding: "6px", textAlign: "center", color: "#b69767", fontWeight: "600" }}>{row.centers}</td>
                      <td style={{ padding: "6px", textAlign: "center", color: "#b69767", fontWeight: "600" }}>{row.gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

     

          {/* البيانات السكانية - Combo Chart */}
          <div style={{
            backgroundColor: theme === "dark" ? "#2a2a2a" : "#f0f0f0",
            padding: "2px",
            borderRadius: "8px",
            marginBottom: "15px"
          }}>
            <h3 style={{ color: "#b69767", marginBottom: "15px", fontSize: "16px", textAlign: "center" }}>إحصائيات السكان والإعاقة بالمدينة المنورة</h3>
            
            {/* Combo Chart - Bars + Lines */}
            <div style={{ direction: "rtl", textAlign: "center", position: "relative" }}>
              <svg
                width="100%"
                height="350"
                viewBox="0 0 900 350"
                style={{
                  minHeight: "350px",
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "#fafafa",
                  borderRadius: "6px"
                }}
              >
                {/* خطوط الشبكة الأفقية */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={`grid-${i}`}
                    x1="60"
                    y1={300 - (i * 50)}
                    x2="880"
                    y2={300 - (i * 50)}
                    stroke={theme === "dark" ? "#333" : "#e0e0e0"}
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                ))}

                {/* المحور الأيسر Y (عدد السكان) */}
                <line x1="60" y1="30" x2="60" y2="300" stroke={theme === "dark" ? "#666" : "#999"} strokeWidth="2" />
                <line x1="50" y1="300" x2="880" y2="300" stroke={theme === "dark" ? "#666" : "#999"} strokeWidth="2" />

                {/* تسميات المحور الأيسر */}
                {[0, 250, 500, 750, 1000, 1250].map((val, i) => (
                  <g key={`y-label-${i}`}>
                    {/* خلفية للأرقام */}
                    <rect
                      x="-40"
                      y={295 - (i * 50)}
                      width="50"
                      height="20"
                      fill={theme === "dark" ? "#1a1a1a" : "#ffffff"}
                      rx="3"
                    />
                    {/* الرقم نفسه */}
                    <text
                      x="-5"
                      y={308 - (i * 50)}
                      textAnchor="end"
                      fontSize="14"
                      fontWeight="700"
                      fill="#b69767"
                    >
                      {val}K
                    </text>
                  </g>
                ))}

                {/* تسميات المحور السفلي X */}
                {["2000", "2004", "2007", "2010", "2016", "2017"].map((year, i) => (
                  <text
                    key={`x-label-${i}`}
                    x={70 + i * 130}
                    y="320"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="600"
                    fill={theme === "dark" ? "#ddd" : "#333"}
                  >
                    {year}
                  </text>
                ))}

                {/* الأعمدة - عدد السكان */}
                {[
                  { x: 70, val: 1061091 },
                  { x: 200, val: 1144271 },
                  { x: 330, val: 1215514 },
                  { x: 460, val: 1265561 },
                  { x: 590, val: 1353102 },
                  { x: 720, val: 1376244 }
                ].map((bar, i) => {
                  const barHeight = (bar.val / 1400000) * 250;
                  return (
                    <rect
                      key={`bar-${i}`}
                      x={bar.x - 15}
                      y={300 - barHeight}
                      width="30"
                      height={barHeight}
                      fill="#5b9bd5"
                      opacity="0.7"
                      style={{ transition: "opacity 0.3s" }}
                    />
                  );
                })}

                {/* الخط الأحمر - كثافة السكان */}
                <polyline
                  points="70,270 200,265 330,263 460,256 590,215 720,50"
                  fill="none"
                  stroke="#e74c3c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* نقاط الخط الأحمر */}
                {[
                  { x: 70, y: 270 },
                  { x: 200, y: 265 },
                  { x: 330, y: 263 },
                  { x: 460, y: 256 },
                  { x: 590, y: 215 },
                  { x: 720, y: 50 }
                ].map((point, i) => (
                  <circle
                    key={`red-point-${i}`}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#e74c3c"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}

                {/* الخط الأخضر - نسبة الزيادة */}
                <polyline
                  points="70,285 200,289 330,289 460,288 590,280 720,255"
                  fill="none"
                  stroke="#27ae60"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* نقاط الخط الأخضر */}
                {[
                  { x: 70, y: 285 },
                  { x: 200, y: 289 },
                  { x: 330, y: 289 },
                  { x: 460, y: 288 },
                  { x: 590, y: 280 },
                  { x: 720, y: 255 }
                ].map((point, i) => (
                  <circle
                    key={`green-point-${i}`}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#27ae60"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}

                {/* عنوان المحور الأيسر */}
               
              </svg>
            </div>

            {/* Legend */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "20px",
              padding: "12px",
              backgroundColor: theme === "dark" ? "#1a1a1a" : "#f5f5f5",
              borderRadius: "6px",
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", direction: "rtl" }}>
                <div style={{ width: "20px", height: "3px", backgroundColor: "#e74c3c" }} />
                <span style={{ fontSize: "16px", fontWeight: "700" }}>كثافة السكان</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", direction: "rtl" }}>
                <div style={{ width: "20px", height: "3px", backgroundColor: "#27ae60" }} />
                <span style={{ fontSize: "16px", fontWeight: "700" }}>نسبة الزيادة</span>
              </div>
            </div>
          </div>

          {/* معلومات المصدر */}
 
        </div>

        {/* Map Container - 60% */}
        <div style={{
          width: "50%",
          position: "relative"
        }}>
          <MapContainer
            center={madinahCoordinates}
            zoom={7}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Map Zoom Controller */}
            <MapZoomController selectedCenter={selectedCenter} markersRef={markersRef} />
            
            {/* عرض حدود المناطق من Al-Madinah.json */}
            <GeoJSON data={AlMadinahData} style={polygonStyle} onEachFeature={onEachFeature} />
            
            {/* عرض النقاط من Carecenters.json */}
            {CareCentersData.features.map((feature, index) => {
              const keyColor = "#b69767";
              const popupContent = Object.entries(feature.properties)
                .filter(([key, value]) => value !== 0 && value !== "0") // تصفية القيم التي تساوي 0
                .map(
                  ([key, value]) => {
                    const translatedKey = translateKey(key);
                    return `<p style="margin: 8px 0; font-size: 13px; text-align: right;"><strong style="color: #b69767; font-weight: 700;">${translatedKey}:</strong> <span style="color: #b69767 !important; font-weight: 700;">${value}</span></p>`;
                  }
                ).join('');
              
              return (
                <Marker
                  key={index}
                  position={[
                    feature.geometry.coordinates[1],
                    feature.geometry.coordinates[0]
                  ]}
                  icon={careCenterIcon}
                  ref={(marker) => {
                    if (marker) markersRef.current[index] = marker;
                  }}
                >
                  <Popup>
                    <div 
                      style={{ textAlign: "right", direction: "rtl", backgroundColor: "#ffffff", padding: "10px" }}
                      dangerouslySetInnerHTML={{ __html: popupContent }}
                    />
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Right Sidebar - 20% */}
        <div style={{
          width: "20%",
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#f9f9f9",
          borderLeft: `1px solid ${theme === "dark" ? "#333" : "#ddd"}`,
          padding: "20px",
          overflowY: "auto",
          color: theme === "dark" ? "#fff" : "#000"
        }}>
          <h2 style={{ fontSize: "18px", marginTop: 0, textAlign: "center" }}> مراكز العناية</h2>
          <div style={{
            backgroundColor: theme === "dark" ? "#2a2a2a" : "#f0f0f0",
            padding: "15px",
            borderRadius: "8px",
            maxHeight: "800px",
            overflowY: "auto"
          }}>
            {CareCentersData.features.map((feature, index) => (
              <div
                key={index}
                onClick={() => setSelectedCenter({ index, feature })}
                style={{
                  padding: "10px",
                  marginBottom: "8px",
                  backgroundColor: selectedCenter?.index === index 
                    ? "#b69767" 
                    : (theme === "dark" ? "#1a1a1a" : "#f5f5f5"),
                  borderRight: "3px solid #b69767",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer",
                  textAlign: "right",
                  direction: "rtl",
                  transition: "all 0.3s ease",
                  color: selectedCenter?.index === index ? "white" : (theme === "dark" ? "#fff" : "#000"),
                  fontWeight: selectedCenter?.index === index ? "700" : "normal"
                }}
              >
                <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
                  {index + 1}. {feature.properties.name}
                </p>
              </div>
            ))}
          </div>
     
        </div>
      </div>
    </div>
  );
};

export default MapPage;
