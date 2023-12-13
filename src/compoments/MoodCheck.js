// src/components/MoodCheck.js
import React, { useState } from 'react';
import GoodImage from '../images/good.png';
import BadImage from '../images/bad.png';
import NormalImage from '../images/normal.png';

const MoodCheck = ({ onMoodSubmit }) => {
  const [selectedMood, setSelectedMood] = useState('');
  const moodImages = {
    positive: GoodImage,
    negative: BadImage,
    neutral: NormalImage,
  };

  const handleMoodSubmit = async () => {
    try {
      console.log(JSON.stringify({ mood: selectedMood })); // 확인을 위한 로그
      const response = await fetch('http://192.168.0.2:3001/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood: selectedMood }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Data saved successfully!');
        // 추가적인 처리나 화면 갱신이 필요하다면 여기서 처리
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <h1>Mood Check</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {Object.entries(moodImages).map(([mood, image]) => (
          <img
            key={mood}
            src={image}
            alt={`${mood} Mood`}
            onClick={() => setSelectedMood(mood)}
            style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
          />
        ))}
      </div>
      <label>
        How are you feeling? {selectedMood && <span>({selectedMood})</span>}
      </label>
      <button onClick={handleMoodSubmit}>Submit</button>
    </div>
  );
};

export default MoodCheck;
