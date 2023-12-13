// src/components/Visualization.js
import React, { useEffect, useState } from 'react';

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

  return (
    <div>
      <h1>Data Visualization</h1>
      <table border="1">
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map((colName) => (
              <th key={colName}>{colName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Visualization;
