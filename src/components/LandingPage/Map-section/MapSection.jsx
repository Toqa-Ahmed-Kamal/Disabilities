import React, { useState, useEffect } from "react";
import "./MapSection.css";
import layoutSvg from '../../../../Layout.svg?raw';

const MapSection = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    setSvgContent(layoutSvg);
  }, []);

  useEffect(() => {
    if (svgContent) {
      setTimeout(() => {
        const container = document.querySelector('.svg-container');
        if (!container) return;
        
        const polygons = container.querySelectorAll('polygon');
        console.log('عدد الـ polygons:', polygons.length);
        
        // تطبيق styling و event listeners
        polygons.forEach((polygon, index) => {
          polygon.style.cursor = 'pointer';
          polygon.style.transition = 'all 0.3s ease';
        });
        
        // استخدام event delegation على الـ container
        container.addEventListener('mouseenter', (e) => {
          if (e.target.tagName === 'polygon') {
            const index = Array.from(polygons).indexOf(e.target);
            const regionId = index + 1;
            console.log('mouseenter على منطقة:', regionId);
            setHoveredRegion(regionId);
            e.target.style.opacity = '0.8';
            e.target.style.filter = 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))';
          }
        }, true);
        
        container.addEventListener('mouseleave', (e) => {
          if (e.target.tagName === 'polygon') {
            console.log('mouseleave');
            setHoveredRegion(null);
            e.target.style.opacity = '1';
            e.target.style.filter = 'none';
          }
        }, true);
      }, 100);
    }
  }, [svgContent]);

  const defaultData = {
    right: [
      { label: "إجمالي المساحة", value: "215.45 كم²" },
      { label: "إجمالي النقاط", value: "1850" },
      { label: "عدد المحطات", value: "925" },
    ],
    left: [
      { label: "عدد المناطق", value: "9" },
      { label: "بيانات إضافية", value: "120" },
      { label: "حالة التحديث", value: "محدث" },
    ],
  };

  const regionsData = {
    1: {
      right: [
        { label: "اسم المنطقة", value: "المنطقة الشمالية الشرقية" },
        { label: "المساحة", value: "22.45 كم²" },
        { label: "عدد المحطات", value: "112" },
      ],
      left: [
        { label: "أسماء المحطات من وإلي", value: "From s1.0 To s_112.0" },
        { label: "طول الشكل", value: "0.245" },
        { label: "بيانات أخرى", value: "15" },
      ],
    },
    2: {
      right: [
        { label: "اسم المنطقة", value: "المنطقة الشمالية الغربية" },
        { label: "المساحة", value: "31.20 كم²" },
        { label: "عدد المحطات", value: "156" },
      ],
      left: [
        { label: "أسماء المحطات من وإلي", value: "From s113.0 To s_268.0" },
        { label: "طول الشكل", value: "0.312" },
        { label: "بيانات أخرى", value: "22" },
      ],
    },
    3: {
      right: [
        { label: "اسم المنطقة", value: "المنطقة الجنوبية الشرقية" },
        { label: "المساحة", value: "25.80 كم²" },
        { label: "عدد المحطات", value: "129" },
      ],
      left: [
        { label: "أسماء المحطات من وإلي", value: "From s269.0 To s_397.0" },
        { label: "طول الشكل", value: "0.278" },
        { label: "بيانات أخرى", value: "18" },
      ],
    },
    4: {
      right: [
        { label: "اسم المنطقة", value: "المنطقة الجنوبية الغربية" },
        { label: "المساحة", value: "18.90 كم²" },
        { label: "عدد المحطات", value: "95" },
      ],
      left: [
        { label: "أسماء المحطات من وإلي", value: "From s398.0 To s_492.0" },
        { label: "طول الشكل", value: "0.201" },
        { label: "بيانات أخرى", value: "12" },
      ],
    },
    5: {
      right: [
        { label: "اسم المنطقة", value: "المنطقة الوسطى الشمالية" },
        { label: "المساحة", value: "27.65 كم²" },
        { label: "عدد المحطات", value: "138" },
      ],
      left: [
        { label: "أسماء المحطات من وإلي", value: "From s493.0 To s_630.0" },
        { label: "طول الشكل", value: "0.289" },
        { label: "بيانات أخرى", value: "20" },
      ],
    },
    6: {
      right: [
        { label: "اسم المنطقة", value: "المنطقة الوسطى الجنوبية" },
        { label: "المساحة", value: "23.15 كم²" },
        { label: "عدد المحطات", value: "116" },
      ],
      left: [
        { label: "أسماء المحطات من وإلي", value: "From s631.0 To s_746.0" },
        { label: "طول الشكل", value: "0.256" },
        { label: "بيانات أخرى", value: "16" },
      ],
    },
    7: {
      right: [
        { label: "اسم المنطقة", value: "المنطقة الشرقية" },
        { label: "المساحة", value: "29.40 كم²" },
        { label: "عدد المحطات", value: "147" },
      ],
      left: [
        { label: "أسماء المحطات من وإلي", value: "From s747.0 To s_893.0" },
        { label: "طول الشكل", value: "0.301" },
        { label: "بيانات أخرى", value: "21" },
      ],
    },
    8: {
      right: [
        { label: "اسم المنطقة", value: "المنطقة الغربية" },
        { label: "المساحة", value: "21.80 كم²" },
        { label: "عدد المحطات", value: "109" },
      ],
      left: [
        { label: "أسماء المحطات من وإلي", value: "From s894.0 To s_1002.0" },
        { label: "طول الشكل", value: "0.235" },
        { label: "بيانات أخرى", value: "14" },
      ],
    },
    9: {
      right: [
        { label: "اسم المنطقة", value: "المنطقة الوسطى" },
        { label: "المساحة", value: "16.10 كم²" },
        { label: "عدد المحطات", value: "81" },
      ],
      left: [
        { label: "أسماء المحطات من وإلي", value: "From s1003.0 To s_1084.0" },
        { label: "طول الشكل", value: "0.187" },
        { label: "بيانات أخرى", value: "10" },
      ],
    },
  };

  const currentRight = hoveredRegion && regionsData[hoveredRegion]
    ? regionsData[hoveredRegion].right
    : defaultData.right;
  const currentLeft = hoveredRegion && regionsData[hoveredRegion]
    ? regionsData[hoveredRegion].left
    : defaultData.left;

  return (
    <div className="content-container2">
      <div className="map-section-wrapper">
        <h2 className="map-section-title">المدينة المنورة</h2>

        <div className="map-content-grid">
          <div className="map-stats-side right-side">
            {currentRight.map((item, idx) => (
              <div key={idx} className="stat-card">
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="map-container-center">
            {svgContent ? (
              <div 
                dangerouslySetInnerHTML={{ __html: svgContent }}
                className="svg-container"
              />
            ) : (
              <div className="svg-loading">جاري تحميل الخريطة...</div>
            )}
          </div>

          <div className="map-stats-side left-side">
            {currentLeft.map((item, idx) => (
              <div key={idx} className="stat-card">
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
