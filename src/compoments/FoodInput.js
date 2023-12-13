// src/components/FoodInput.js
// git 정리
import React, { useState } from 'react';

const FoodInput = ({ onFoodSubmit }) => {
  const [food, setFood] = useState('');

  const handleFoodSubmit = () => {
    onFoodSubmit(food);
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