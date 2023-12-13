// 예제: MoodFoodVisualization.js

import React, { useEffect, useState } from 'react';

const MoodFoodVisualization = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.2:3001/getData');
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          console.error('Error fetching data:', result.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  // 데이터를 기반으로 이미지로 시각화
  const renderVisualization = () => {
    return data.map((item, index) => (
      <div key={index}>
        <p>Mood: {item.Mood}</p>
        <p>Food: {item.Food}</p>
        <p>TimeStamp: {item.TimeStamp}</p>
        {/* 이곳에서 Mood와 Food에 따라 이미지를 출력하는 로직을 추가 */}
        {/* 예: */}
        {/* <img src={`images/${item.Mood.toLowerCase()}.png`} alt={item.Mood} /> */}
      </div>
    ));
  };

  return (
    <div>
      <h1>Mood and Food Visualization</h1>
      {renderVisualization()}
    </div>
  );
};

export default MoodFoodVisualization;
