// src/components/FoodInput.js
import React, { useState } from 'react';

const FoodInput = ({ onFoodSubmit }) => {
  const [food, setFood] = useState('');

  const handleFoodSubmit = async () => {
    // 파싱된 음식 데이터를 배열로 변환
    const foodArray = food.split(',').map(item => item.trim());
    
    try {
      const response = await fetch('http://192.168.0.2:3001/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ food: foodArray }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Data saved successfully!');
        // 추가적인 처리나 화면 갱신이 필요하다면 여기서 처리
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }

    // 입력된 음식 초기화
    setFood('');
  };

  return (
    <div>
      <h1>Food Input</h1>
      <label>
        What did you eat?{' '}
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
      </label>
      <button onClick={handleFoodSubmit}>Submit</button>
    </div>
  );
};

export default FoodInput;
