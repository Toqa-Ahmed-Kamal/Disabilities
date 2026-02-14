# النقاط على الخريطة ومصادرها

## 📍 **النقاط (Points/Markers)**

### 1️⃣ **Stations (المحطات)**
- **المصدر**: `/data/stations.geojson`
- **اللون**: 
  - 🔴 أحمر (#ff0000) للـ Sample
  - 🔵 أزرق (#007bff) للـ Station العادية
- **الحجم**: 
  - 14px للـ Samples
  - 12px للـ Stations
- **البيانات**: تحتوي على Name, Type, وخصائص أخرى

---

### 2️⃣ **New Points (نقاط إضافية)**
- **المصدر**: يتم تمريرها من خلال `newPointsGeoJSON` prop
- **الألوان** (حسب الـ Description):
  - 🔴 أحمر (#ff0000) - Rock fall
  - 🟢 أخضر (#00aa00) - Transition zone
  - 🔵 أزرق (#0000ff) - Water channel
  - 🟡 ذهبي (#ffd700) - Geological phenomena
  - ⚫ رمادي (#888888) - اعمال الحماية القائمة
  - ⚫ أسود (افتراضي) - أنواع أخرى

---

### 3️⃣ **All Stations (جميع المحطات)**
- **المصدر**: `/data/AllStations.geojson`
- **الألوان** (حسب الـ zone):
  - 🟢 أخضر (#00ff00) - North-East
  - 🟣 بنفسجي (#ff00ff) - South-West
  - 🔵 سماوي (#00ffff) - Central
  - 🟠 برتقالي (#ffa500) - افتراضي
- **الحجم**: 6px
- **التسميات**: تعرض StationNam

---

### 4️⃣ **S1 Label (المحطة الأولى)**
- **المصدر**: محسوبة من أول نقطتي Stations
- **الموضع**: في منتصف الخط بين أول نقطتين
- **التسمية**: "المحطة الأولى"

---

## 🗺️ **الطبقات (Layers)**

### 5️⃣ **Area (المنطقة)**
- **المصدر**: `/data/area.geojson`
- **النوع**: Fill Polygon
- **اللون**: 🔴 أحمر (#ff0000) بشفافية 30%
- **الحدود**: خط أحمر بسمك 2px

---

### 6️⃣ **Roads (الطرق)**
- **المصدر**: `/data/roads.geojson`
- **النوع**: Line
- **اللون**: 🔵 أزرق (#0000ff)
- **السمك**: 3px

---

### 7️⃣ **Boundary (الحد)**
- **المصدر**: `/data/boundary.geojson`
- **النوع**: Fill Polygon
- **اللون**: 🟡 ذهبي (#ffd000) بشفافية 20%
- **الحدود**: خط برتقالي (#ff9100) بسمك 2px

---

### 8️⃣ **Layer (طبقة عامة)**
- **المصدر**: `/data/layer.geojson`
- **النوع**: Polygon
- **اللون**: شفاف (بدون لون)
- **الحدود**: أسود بسمك 6px

---

### 9️⃣ **Hillshade Image (صورة الظلال)**
- **المصدر**: `/data/Hillshade_NoData_1.png`
- **النوع**: Raster Image (صورة)
- **الشفافية**: 70%
- **يظهر فقط عند**: اختيار Dark Base Map
- **الإحداثيات**:
  - Top Left: [39.854, 21.46]
  - Top Right: [40.015, 21.46]
  - Bottom Right: [40.015, 21.326]
  - Bottom Left: [39.854, 21.326]

---

### 🔟 **Terrain (التضاريس)**
- **المصدر**: AWS S3 - `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png`
- **النوع**: Digital Elevation Model (DEM)
- **نوع الـ Encoding**: Terrarium
- **Exaggeration**: 1.5x

---

## 📁 **ملخص ملفات البيانات**

| الملف | المصدر | النوع |
|------|--------|-------|
| stations.geojson | `/data/` | GeoJSON - Points |
| AllStations.geojson | `/data/` | GeoJSON - Points |
| area.geojson | `/data/` | GeoJSON - Polygon |
| roads.geojson | `/data/` | GeoJSON - LineString |
| boundary.geojson | `/data/` | GeoJSON - Polygon |
| layer.geojson | `/data/` | GeoJSON - Polygon |
| Hillshade_NoData_1.png | `/data/` | PNG Image |
| Terrain Tiles | AWS S3 | Remote DEM |

---

## 🔗 **الخيارات المتاحة**

### Base Maps
1. **Default**: `https://demotiles.maplibre.org/style.json`
2. **Dark**: `https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json`
3. **Imagery (Satellite)**: `https://api.maptiler.com/maps/satellite/style.json?key=oh2RuUJTGdHt3cFgDcV7`

---

## ⚙️ **الإعدادات**

- **Language**: RTL (اليمين إلى اليسار) للنصوص العربية
- **Zoom Levels**: تصل إلى 18
- **Theme**: Dark/Light (مدعوم)
- **Popups**: نقر على النقاط يفتح معلومات إضافية
