import React, { useEffect, useState } from "react";
import "./MapSection.css";
import layoutSvg from '../../../../Layout.svg?raw';

const MapSection = () => {
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
        
        // تطبيق styling
        polygons.forEach((polygon) => {
          polygon.style.cursor = 'pointer';
          polygon.style.transition = 'all 0.3s ease';
        });
      }, 100);
    }
  }, [svgContent]);

  return (
    <div className="content-container2">
      <div className="map-section-wrapper">
        <h2 className="map-section-title">المدينة المنورة</h2>

        <div className="map-content-grid">
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
        </div>
      </div>
    </div>
  );
};

export default MapSection;
