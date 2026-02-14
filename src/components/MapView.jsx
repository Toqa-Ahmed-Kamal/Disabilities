import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import ChartsSection from "./ChartsSection";

const MapView = forwardRef(function MapView({ 
  theme
}, ref) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);











useEffect(() => {
  if (mapRef.current) return; // 👈 امنع إعادة الإنشاء

  const map = new maplibregl.Map({
    container: mapContainer.current,
    style: {
      version: 8,
      sources: {
        'osm-tiles': {
          type: 'raster',
          tiles: [
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
          ],
          tileSize: 256
        }
      },
      layers: [{ id: 'osm-tiles', type: 'raster', source: 'osm-tiles' }]
    },
    center: [45.13,24.82 ],
    zoom: 4,
    pitch: 0,
    bearing: 0,
    antialias: true,
  });

  mapRef.current = map;

  map.once("load", () => {
    // Load Disabilities.json and add to map
    fetch("/Disabilities.json")
      .then(r => r.json())
      .then(disabilitiesData => {
        
        map.addSource('disabilities', {
          type: 'geojson',
          data: disabilitiesData
        });

        map.addLayer({
          id: 'disabilities-fill',
          type: 'fill',
          source: 'disabilities',
          paint: {
            'fill-color': '#90EE90',
            'fill-opacity': 0.35
          }
        });

        map.addLayer({
          id: 'disabilities-outline',
          type: 'line',
          source: 'disabilities',
          paint: {
            'line-color': '#1B5E20',
            'line-width': 2.5
          }
        });

        // Add popup on click
        map.on('click', 'disabilities-fill', (e) => {
          if (!e.features || e.features.length === 0) return;

          const props = e.features[0].properties;
          const coordinates = e.lngLat;

          const regionName = props['bdata.Name_Ar'] || props['Name_Ar'] || 'المنطقة';
          
          // ترجمة المفاتيح
          const keyTranslations = {
            'Name_Ar': 'الاسم بالعربية',
            'Rank': 'الترتيب',
            'Percent': 'النسبة المئوية',
            'Count': 'العدد',
            'ترتيب الذكور - طيف التوحد': 'طيف التوحد - رتبة الذكور',
            'نسبة الذكور - طيف التوحد': 'طيف التوحد - نسبة الذكور',
            'عدد الذكور - طيف التوحد': 'طيف التوحد - عدد الذكور'
          };
          
          const translateKeyFunc = (key) => {
            if (keyTranslations[key]) return keyTranslations[key];
            let translated = key;
            translated = translated.replace(/_Rank/g, ' - الترتيب');
            translated = translated.replace(/_Percent/g, ' - النسبة المئوية');
            translated = translated.replace(/_Count/g, ' - العدد');
            return translated;
          };
          
          // الحقول المراد حجبها
          const hiddenKeys = ['bdata.FID', 'bdata.Name_Ar', 'bdata.Name_En', 'bdata.Area_ID', 'bdata.Shape_Leng', 'bdata.Shape_Area', 'bdata.Code', 'bdata.Indicator_', 'bdata.السنة', 'bdata.القيم', 'bdata.وحدة_', 'bdata.Field', 'Field39'];
          
          const filteredProps = Object.entries(props).filter(([key, value]) => !hiddenKeys.includes(key) && value !== 0 && value !== "0");
          
          const popupHTML = `
            <div style="padding: 15px; font-family: Arial, sans-serif; max-width: 500px; max-height: 400px; overflow-y: auto; background: white; border-radius: 8px; text-align: right; direction: rtl;">
              <h3 style="margin: 0 0 15px 0; color: #b69767; font-size: 18px; padding-bottom: 10px; border-bottom: 3px solid #b69767;">${regionName}</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px;">
                ${filteredProps.map(([key, value]) => `
                  <tr style="border-bottom: none;">
                    <td style="color: #b69767 !important; font-weight: 700; padding: 6px 8px; text-align: right;">${translateKeyFunc(key)}:</td>
                    <td style="color: #b69767 !important; font-weight: 600; padding: 6px 8px; text-align: right;">${value || 'غير محدد'}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
          `;

          new maplibregl.Popup({
            offset: [0, -50],
            closeButton: true,
            closeOnClick: true,
            maxWidth: '500px'
          })
            .setLngLat(coordinates)
            .setHTML(popupHTML)
            .addTo(map);
        });

        // Change cursor on hover
        map.on('mouseenter', 'disabilities-fill', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'disabilities-fill', () => {
          map.getCanvas().style.cursor = '';
        });

        // Expose map methods for external use
        map.filterByZones = (zones, showAll) => {
          console.log('filterByZones executing with zones:', zones, 'showAll:', showAll);
          if (showAll) {
            // Show all features
            console.log('ShowAll is true - showing all features');
            map.setFilter('disabilities-fill', null);
            map.setFilter('disabilities-outline', null);
            map.flyTo({ center: [45.13, 24.82], zoom: 4, duration: 1000 });
          } else if (zones.length > 0) {
            // Show only selected zones
            const filter = ['in', ['get', 'bdata.Name_Ar'], ['literal', zones]];
            console.log('Showing selected zones with filter:', filter);
            map.setFilter('disabilities-fill', filter);
            map.setFilter('disabilities-outline', filter);
            
            // Calculate bounds for selected zones and zoom
            fetch('/Disabilities.json')
              .then(r => r.json())
              .then(geoData => {
                const selectedFeatures = geoData.features.filter(f => zones.includes(f.properties['bdata.Name_Ar'] || f.properties['Name_Ar']));
                if (selectedFeatures.length > 0) {
                  const bounds = [Infinity, Infinity, -Infinity, -Infinity];
                  selectedFeatures.forEach(feature => {
                    if (feature.geometry.type === 'Polygon') {
                      feature.geometry.coordinates[0].forEach(coord => {
                        bounds[0] = Math.min(bounds[0], coord[0]);
                        bounds[1] = Math.min(bounds[1], coord[1]);
                        bounds[2] = Math.max(bounds[2], coord[0]);
                        bounds[3] = Math.max(bounds[3], coord[1]);
                      });
                    }
                  });
                  if (bounds[0] !== Infinity) {
                    map.fitBounds(bounds, { padding: 40, duration: 1000 });
                  }
                }
              })
              .catch(err => console.error('Error calculating bounds:', err));
          } else {
            // Hide all - showAll is false and no zones selected
            console.log('Hiding all features');
            map.setFilter('disabilities-fill', ['in', ['get', 'bdata.Name_Ar'], ['literal', []]]);
            map.setFilter('disabilities-outline', ['in', ['get', 'bdata.Name_Ar'], ['literal', []]]);
          }
        };
      })
      .catch(err => console.error('Error loading Disabilities.json:', err));


  });

  return () => {
    map.remove(); // ✅ cleanup
    mapRef.current = null;
  };
}, []);

// Expose filterByZones method via ref
useImperativeHandle(ref, () => {
  console.log('useImperativeHandle executing - exposing filterByZones, mapRef.current available:', !!mapRef.current);
  return {
    filterByZones: (zones, showAll) => {
      console.log('filterByZones method called with zones:', zones, 'showAll:', showAll);
      if (mapRef.current && mapRef.current.filterByZones) {
        console.log('Calling internal filterByZones');
        mapRef.current.filterByZones(zones, showAll);
      } else {
        console.log('ERROR: mapRef.current.filterByZones not available');
      }
    }
  };
}, []);






  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", height: "65%", position: "relative" }}>
        <div
          ref={mapContainer}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
        />




      </div>

  

      <div style={{ height: "35%" }}>
        <ChartsSection theme={theme} />
      </div>
    </div>
  );
});

export default MapView;
