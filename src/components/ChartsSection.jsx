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
      padding: "10px",
      height: "100%",
      overflow: "auto"
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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "10px",
          padding: "10px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flex: "0 0 auto", order: 3 }}>
          <ResponsiveContainer width={450} height={200}>
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
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: theme === "dark" ? "#eaeaea" : "#111111" }} />
              <YAxis tick={{ fontSize: 12, fill: theme === "dark" ? "#eaeaea" : "#111111" }} />
              <Tooltip 
                contentStyle={{
                  background: theme === "dark" ? "#252525" : "#fff",
                  color: theme === "dark" ? "#eaeaea" : "#111111",
                  border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "#ddd"}`
                }}
                formatter={(value) => value.toLocaleString()}
              />
              <Legend wrapperStyle={{ color: theme === "dark" ? "#eaeaea" : "#111111" }} />
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
          order: 2,
          flex: "0 0 auto"
        }}>
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={careDataPie}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ value }) => `${value}%`}
                outerRadius={60}
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
            fontSize: "11px",
            color: theme === "dark" ? "#eaeaea" : "#555",
            textAlign: "center",
            marginTop: "5px",
            marginBottom: "0px"
          }}>حجم المستفيدين من الرعايات المالية في منطقة المدينة المنورة</p>
        </div>

        {/* البار تشارت الثاني والجدول */}
        <div style={{
          flex: 1,
          padding: "5px",
          order: 1
        }}>
          <h3 style={{
            textAlign: "right",
            marginBottom: "4px",
            color: theme === "dark" ? "#eaeaea" : "#333",
            fontSize: "11px",
            fontWeight: "bold"
          }}>توزيع المستفيدين حسب نوع الإعاقة</h3>
          
          <ResponsiveContainer width={550} height={200}>
          <BarChart data={disabilityBarChart}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(255,255,255,0.1)" : "#ddd"} />
            <XAxis 
              dataKey="name"
              tick={{ fontSize: 9, fill: theme === "dark" ? "#eaeaea" : "#111111" }}
              angle={-45}
              textAnchor="end"
              height={40}
            />
            <YAxis tick={{ fontSize: 9, fill: theme === "dark" ? "#eaeaea" : "#111111" }} />
            <Tooltip 
              contentStyle={{
                background: theme === "dark" ? "#252525" : "#fff",
                color: theme === "dark" ? "#eaeaea" : "#111111",
                border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "#ddd"}`
              }}
              formatter={(value) => value.toLocaleString()}
              labelFormatter={(label) => `${label}`}
            />
            <Legend wrapperStyle={{ paddingTop: "10px", color: theme === "dark" ? "#eaeaea" : "#111111", fontSize: "10px" }} />
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
        gap: "10px",
        padding: "10px",
        alignItems: "flex-start"
      }}>   
       
   

      </div>
    </div>
  );
}

export default ChartsSection;