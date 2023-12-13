// src/components/Visualization.js
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Visualization = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.2:3001/getData');
        const result = await response.json();

        if (result.success) {
          // Convert objects to strings
          const formattedData = result.data.map((item) => {
            return Object.fromEntries(
              Object.entries(item).map(([key, value]) => [key, value !== null && typeof value === 'object' ? JSON.stringify(value) : value])
            );
          });

          setData(formattedData);
        } else {
          console.error('Error fetching data:', result.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  // Extract relevant data for the chart
  const chartData = data.map(({ Timestamp, Mood }) => ({
    Timestamp,
    Mood: Mood === 'positive' ? 1 : (Mood === 'negative' ? -1 : 0),
  }));

  return (
    <div>
      <h1>Data Visualization</h1>
      <LineChart width={800} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Mood" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default Visualization;
