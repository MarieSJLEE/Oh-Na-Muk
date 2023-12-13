// src/components/MoodByHourVisualization.js
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import './MoodByHourVisualization.css'; // 시각화 스타일을 위한 CSS 파일 추가

const MoodByHourVisualization = () => {
  // 여기에 데이터를 가져오는 로직을 추가하세요.
  const [data, setData] = useState([]);

  useEffect(() => {
    // 여기에 데이터를 가져오는 비동기 로직을 작성하세요.
    const fetchData = async () => {
      try {
        const response = await fetch('/getData'); // 데이터를 가져오는 API 엔드포인트에 맞게 수정
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log(fetchData)
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 설정

  return (
    <div className="mood-by-hour-visualization">
      <h2>Mood By Hour Visualization</h2>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="moodValue" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default MoodByHourVisualization;
