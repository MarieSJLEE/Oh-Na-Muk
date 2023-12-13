// src/components/Visualization.js
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter, ScatterChart } from 'recharts';

const Visualization = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/getData');
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
  }, []);

  // Transform data for recharts
  const chartData = data.map(({ Timestamp, Mood, Food }) => ({
    Timestamp,
    Mood: Mood === 'positive' ? 1 : (Mood === 'negative' ? -1 : 0),
    Food: Food || null,
  }));

  return (
    <div>
      <h1>Data Visualization</h1>
      <LineChart
        width={800}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <XAxis dataKey="Timestamp" />
        <YAxis type="number" domain={[-1, 1]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Mood" stroke="#8884d8" />
        <Scatter data={chartData.filter(({ Mood }) => Mood !== null)} fill="#8884d8" />
        <Line type="monotone" dataKey="Food" stroke="#82ca9d" />
        <ScatterChart>
          <Scatter data={chartData.filter(({ Food }) => Food !== null)} fill="#82ca9d" />
        </ScatterChart>
      </LineChart>
    </div>
  );
};

export default Visualization;
