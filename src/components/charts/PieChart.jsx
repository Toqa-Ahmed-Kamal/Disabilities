import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PieChart = ({ data, colors = ['#d4af37', '#ff6b6b', '#4ecdc4', '#45b7d1'], theme = 'light' }) => {
  const bgColor = theme === 'dark' ? '#1a1a1a' : '#fff';
  const textColor = theme === 'dark' ? '#fff' : '#000';

  // Convert object data to array format for recharts
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value: value
  })).filter(item => item.value > 0); // Only show non-zero values

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ 
          backgroundColor: bgColor, 
          padding: '8px 12px', 
          border: `1px solid ${theme === 'dark' ? '#404040' : '#ccc'}`,
          borderRadius: '6px',
          color: textColor,
          fontSize: '12px'
        }}>
          <p style={{ margin: 0 }}>{`${data.name}: ${data.value}${data.value === 100 ? '%' : ''}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '160px', backgroundColor: 'transparent' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={60}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export { PieChart };