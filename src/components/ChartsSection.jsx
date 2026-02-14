import { useState, useEffect } from "react";
import { NumberDisplay } from "./charts/NumberDisplay";
import { faFemale, faMale, faHospital, faWheelchair, faUsers } from '@fortawesome/free-solid-svg-icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function ChartsSection({ theme }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 1366);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsCompact(window.innerWidth <= 1366);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [statsData, setStatsData] = useState({
    fullyExecutedStations: 0,
    partiallyExecutedStations: 0,
    structuralMeasurements: 0,
    dipDirectionPoints: 0,
    rockSamples: 0,
    hazardLocations: 0,
    fieldPhotos: 0,
    sportsCenter: 170,
    maleCenter: 34,
    centerInKingdom: 204,
    disabled: 2036686,
    beneficiaries: 13973
  });

  const disabilityChartData = [
    { year: '2000', population: 15588805, disabled: 257183, rate: 1.6, growth: 0 },
    { year: '2007', population: 17493364, disabled: 134956, rate: 0.8, growth: -9 },
    { year: '2016', population: 20064970, disabled: 667280, rate: 3.3, growth: 19 },
    { year: '2017', population: 20408362, disabled: 1445723, rate: 7.1, growth: 117 },
    { year: '2020', population: 20408362, disabled: 2036686, rate: 9.9, growth: 205 },
  ];

  const careDataPie = [
    { name: 'ذوي الإعاقة غير مستفيدي الرعايات', value: 84 },
    { name: 'مستفيدي الرعايات بالمناطق الجارية', value: 15 },
    { name: 'مستفيدي الرعايات بمنطقة المدينة المنورة', value: 1 },
  ];

  // بيانات الإعاقات الجدول
  const disabilityTableData = [
    { type: 'إعاقات بصرية', allowance: '333 ريال شهرياً', users: 27004 },
    { type: 'إعاقات متوسطة', allowance: '833 ريال شهرياً', users: 234813 },
    { type: 'إعاقات شديدة', allowance: '1,166 ريال شهرياً', users: 62593 },
    { type: 'إعاقات شديدة جداً', allowance: '1,166 ريال شهرياً', users: 76343 },
  ];

  // بيانات مخطط الإعاقات
  const disabilityBarChart = [
    { name: 'إعاقات بصرية', users: 27004 },
    { name: 'إعاقات متوسطة', users: 234813 },
    { name: 'إعاقات شديدة', users: 62593 },
    { name: 'إعاقات شديدة جداً', users: 76343 },
  ];

  const pieColors = ['#ffd700', '#c9a48a', '#9a9a7f'];
  const disabilityColors = ['#d4a5a5', '#f4d080', '#a8b8c0', '#a8a88c'];

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      try {
        const SHEET_ID = "1_2Hiy8llH0mwVXmCbDXGYQ0goP_FnU5JRn412QFd2G0";
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const csvText = await response.text();

        // نفس لوجيك HTML + تنظيف
        const rows = csvText
          .trim()
          .split(/\r?\n/)
          .map(r => r.split(",").map(c => c.trim()));

        // شيل الهيدر
        const dataRows = rows.slice(1);

        const result = {
          fullyExecutedStations: 0,
          partiallyExecutedStations: 0,
          structuralMeasurements: 0,
          dipDirectionPoints: 0,
          rockSamples: 0,
          hazardLocations: 0,
          fieldPhotos: 0,
          sportsCenter: 170,
          maleCenter: 34,
          centerInKingdom: 204,
          disabled: 2036686,
          beneficiaries: 13973
        };

        console.log('Data rows:', dataRows);
        
        dataRows.forEach(row => {
          const label = row[0];
          const value = Number(row[1]) || 0;

          console.log(`Label: "${label}", Value: ${value}`);

          if (label.includes("المنفذة بالكامل")) {
            result.fullyExecutedStations = value;
          } else if (label.includes("المنفذة جزئيًا") || label.includes("المنفذة جزئي")) {
            result.partiallyExecutedStations = value;
          } else if (label.includes("القياسات البنيوية")) {
            result.structuralMeasurements = value;
          } else if (label.includes("Dip")) {
            result.dipDirectionPoints = value;
          } else if (label.includes("العينات الصخرية")) {
            result.rockSamples = value;
          } else if (label.includes("مواقع الخطورة")) {
            result.hazardLocations = value;
          } else if (label.includes("الصور الميدانية")) {
            result.fieldPhotos = value;
          }
        });
        
        console.log('Final result:', result);

        setStatsData(result);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
      }
    };

    fetchGoogleSheetData();
  }, []);

  return (
    <div style={{
      backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
      padding: isMobile ? "8px" : isCompact ? "8px" : "10px",
      height: "100%",
      overflow: isMobile ? "auto" : "hidden",
      overflowY: isMobile ? "auto" : "hidden"
    }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0px"
        }}
      >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "flex-start",
          gap: isMobile ? "6px" : isCompact ? "6px" : "8px",
          padding: isMobile ? "6px" : isCompact ? "6px" : "8px",
          overflow: "hidden",
          flexWrap: "nowrap"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flex: isMobile ? "1" : isCompact ? "0 0 250px" : "0 0 350px", order: isMobile ? 3 : 3, minWidth: isMobile ? "100%" : "auto", minHeight: "0" }}>
          <ResponsiveContainer width={isMobile ? "100%" : "100%"} height={isMobile ? 120 : isCompact ? 140 : 180}>
            <BarChart data={disabilityChartData}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#66b3ff" />
                  <stop offset="100%" stopColor="#0052cc" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(255,255,255,0.1)" : "#ddd"} />
              <XAxis dataKey="year" tick={{ fontSize: isMobile ? 10 : 12, fill: theme === "dark" ? "#eaeaea" : "#111111" }} />
              <YAxis tick={{ fontSize: isMobile ? 10 : 12, fill: theme === "dark" ? "#eaeaea" : "#111111" }} />
              <Tooltip 
                contentStyle={{
                  background: theme === "dark" ? "#252525" : "#fff",
                  color: theme === "dark" ? "#eaeaea" : "#111111",
                  border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "#ddd"}`
                }}
                formatter={(value) => value.toLocaleString()}
              />
              <Legend wrapperStyle={{ color: theme === "dark" ? "#eaeaea" : "#111111", fontSize: isMobile ? "9px" : "10px" }} />
              <Bar dataKey="disabled" fill="url(#goldGradient)" name="عدد ذوو الإعاقة" />
              <Bar dataKey="population" fill="url(#blueGradient)" name="عدد السكان" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart في المنتصف */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0px",
          order: isMobile ? 2 : 2,
          flex: isMobile ? "1" : isCompact ? "0 0 140px" : "0 0 180px",
          minWidth: isMobile ? "100%" : "auto",
          minHeight: "0"
        }}>
          <ResponsiveContainer width={isMobile ? "100%" : "100%"} height={isMobile ? 120 : isCompact ? 140 : 180}>
            <PieChart>
              <Pie
                data={careDataPie}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ value }) => `${value}%`}
                outerRadius={isMobile ? 35 : isCompact ? 40 : 50}
                fill="#8884d8"
                dataKey="value"
              >
                {careDataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <p style={{
            fontSize: isMobile ? "8px" : isCompact ? "8px" : "10px",
            color: theme === "dark" ? "#eaeaea" : "#555",
            textAlign: "center",
            marginTop: isMobile ? "2px" : "3px",
            marginBottom: "0px",
            lineHeight: "1.2"
          }}>حجم المستفيدين</p>
        </div>

        {/* البار تشارت الثاني والجدول */}
        <div style={{
          flex: isMobile ? "1" : isCompact ? "0 0 280px" : "1",
          padding: isMobile ? "2px" : isCompact ? "3px" : "4px",
          order: isMobile ? 1 : 1,
          minWidth: isMobile ? "100%" : "auto",
          minHeight: "0",
          overflow: "hidden"
        }}>
          <h3 style={{
            textAlign: "right",
            marginBottom: isMobile ? "2px" : isCompact ? "2px" : "3px",
            color: theme === "dark" ? "#eaeaea" : "#333",
            fontSize: isMobile ? "9px" : isCompact ? "9px" : "10px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>توزيع المستفيدين</h3>
          
          <ResponsiveContainer width={isMobile ? "100%" : "100%"} height={isMobile ? 120 : isCompact ? 140 : 180}>
          <BarChart data={disabilityBarChart}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(255,255,255,0.1)" : "#ddd"} />
            <XAxis 
              dataKey="name"
              tick={{ fontSize: isMobile ? 7 : isCompact ? 7 : 8, fill: theme === "dark" ? "#eaeaea" : "#111111" }}
              angle={-45}
              textAnchor="end"
              height={isMobile ? 25 : isCompact ? 28 : 30}
            />
            <YAxis tick={{ fontSize: isMobile ? 7 : isCompact ? 7 : 8, fill: theme === "dark" ? "#eaeaea" : "#111111" }} />
            <Tooltip 
              contentStyle={{
                background: theme === "dark" ? "#252525" : "#fff",
                color: theme === "dark" ? "#eaeaea" : "#111111",
                border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "#ddd"}`
              }}
              formatter={(value) => value.toLocaleString()}
              labelFormatter={(label) => `${label}`}
            />
            <Legend wrapperStyle={{ paddingTop: isMobile ? "2px" : isCompact ? "3px" : "5px", color: theme === "dark" ? "#eaeaea" : "#111111", fontSize: isMobile ? "8px" : isCompact ? "8px" : "9px" }} />
            <Bar dataKey="users" fill="#f4d080" name="عدد المستفيدين" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        </div>
       
        </div>

      </div>

      {/* جدول فئات الإعاقات والبار تشارت */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: isMobile ? "6px" : isCompact ? "6px" : "8px",
        padding: isMobile ? "6px" : isCompact ? "6px" : "8px",
        alignItems: "flex-start",
        overflow: "hidden"
      }}>   
       
   

      </div>
    </div>
  );
}

export default ChartsSection;