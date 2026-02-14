import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { useState, useEffect } from "react";
import { NumberDisplay } from "./charts/NumberDisplay";
import { faFemale, faMale, faHospital, faWheelchair, faUsers } from '@fortawesome/free-solid-svg-icons';

function LeftSidebar({ theme, selectedStationData }) {
  console.log("🎯 LeftSidebar rendered with selectedStationData:", selectedStationData);
  
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [statsData, setStatsData] = useState({
    sportsCenter: 170,
    maleCenter: 34,
    centerInKingdom: 204,
    disabled: 2036686,
    beneficiaries: 13973
  });
  const TOTAL_STATIONS = 506;

  useEffect(() => {
    // حساب الأيام المتبقية في السنة
    const today = new Date();
    const currentYear = today.getFullYear();
    const lastDayOfYear = new Date(currentYear, 11, 31); // 31 ديسمبر
    
    const timeDifference = lastDayOfYear - today;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
    setDaysRemaining(Math.max(0, daysLeft));
  }, []);

  useEffect(() => {
    // قراءة بيانات النسبة من Google Sheet
    const fetchCompletionData = async () => {
      try {
        const SHEET_ID = "1_2Hiy8llH0mwVXmCbDXGYQ0goP_FnU5JRn412QFd2G0";
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const csvText = await response.text();
        const rows = csvText
          .trim()
          .split(/\r?\n/)
          .map(r => r.split(",").map(c => c.trim()));

        const dataRows = rows.slice(1);

        // البحث عن صف "المحطات المنفذة بالكامل"
        let executedCount = 0;
        dataRows.forEach(row => {
          const label = row[0];
          const value = Number(row[1]) || 0;

          if (label.includes("المنفذة بالكامل")) {
            executedCount = value;
          }
        });

        // حساب النسبة المئوية
        const percentage = (executedCount / TOTAL_STATIONS) * 100;
        setCompletionPercentage(Math.round(percentage));
      } catch (error) {
        console.error("Error fetching completion data:", error);
        setCompletionPercentage(0);
      }
    };

    fetchCompletionData();
  }, []);

  // Default chart data from all stations
  const [elevationData, setElevationData] = useState([
    { name: '400-450م', value: 25 },
    { name: '450-500م', value: 35 },
    { name: '500-550م', value: 20 },
    { name: '550+م', value: 20 },
  ]);

  const [slopeData, setSlopeData] = useState([
    { name: '0-10°', value: 15 },
    { name: '10-20°', value: 30 },
    { name: '20-30°', value: 35 },
    { name: '30+°', value: 20 },
  ]);

  // Update charts when a station is selected
  useEffect(() => {
    console.log("🔄 LeftSidebar useEffect triggered, selectedStationData:", selectedStationData);
    
    if (selectedStationData && selectedStationData.elevation && selectedStationData.slope) {
      console.log("📊 Updating charts with station data:", selectedStationData);
      const elevation = selectedStationData.elevation;
      const slope = selectedStationData.slope;
      
      // Reset all ranges to 0
      const selectedElevationData = [
        { name: '400-450م', value: 0 },
        { name: '450-500م', value: 0 },
        { name: '500-550م', value: 0 },
        { name: '550+م', value: 0 },
      ];
      
      const selectedSlopeData = [
        { name: '0-10°', value: 0 },
        { name: '10-20°', value: 0 },
        { name: '20-30°', value: 0 },
        { name: '30+°', value: 0 },
      ];
      
      // Set the selected station's range to 100%
      if (elevation >= 400 && elevation < 450) selectedElevationData[0].value = 100;
      else if (elevation >= 450 && elevation < 500) selectedElevationData[1].value = 100;
      else if (elevation >= 500 && elevation < 550) selectedElevationData[2].value = 100;
      else if (elevation >= 550) selectedElevationData[3].value = 100;
      
      if (slope >= 0 && slope < 10) selectedSlopeData[0].value = 100;
      else if (slope >= 10 && slope < 20) selectedSlopeData[1].value = 100;
      else if (slope >= 20 && slope < 30) selectedSlopeData[2].value = 100;
      else if (slope >= 30) selectedSlopeData[3].value = 100;
      
      console.log("🏔️ Setting elevation data:", selectedElevationData);
      console.log("📐 Setting slope data:", selectedSlopeData);
      
      setElevationData(selectedElevationData);
      setSlopeData(selectedSlopeData);
    } else {
      console.log("🔄 Resetting to default charts");
      // Reset to default distribution
      setElevationData([
        { name: '400-450م', value: 25 },
        { name: '450-500م', value: 35 },
        { name: '500-550م', value: 20 },
        { name: '550+م', value: 20 },
      ]);
      setSlopeData([
        { name: '0-10°', value: 15 },
        { name: '10-20°', value: 30 },
        { name: '20-30°', value: 35 },
        { name: '30+°', value: 20 },
      ]);
    }
  }, [selectedStationData]);

  return (
    <div
      style={{
        padding: "12px",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        background: "transparent",
        color: theme === "dark" ? "#eaeaea" : "#111111",
        boxSizing: "border-box",
        width: "100%",
      }}
    >

      {/* ---------- Number Display Cards ---------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gap: "1px",
          padding: "1px",
          marginBottom: "20px"
        }}
      >    
      <NumberDisplay
          value={statsData.disabled}
          title="معاق"
          icon={faWheelchair}
          theme={theme}
        />
        <NumberDisplay
          value={statsData.beneficiaries}
          title="مستفيد"
          icon={faUsers}
          theme={theme}
        />
          <NumberDisplay
          value={statsData.centerInKingdom}
          title="مركز في المملكة"
          icon={faHospital}
          theme={theme}
        />
        <NumberDisplay
          value={statsData.sportsCenter}
          title="مركز للبنات"
          icon={faFemale}
          theme={theme}
        />
        <NumberDisplay
          value={statsData.maleCenter}
          title="مركز للذكور"
          icon={faMale}
          theme={theme}
        />
    
      </div>

 
    </div>
  );
}

export default LeftSidebar;
