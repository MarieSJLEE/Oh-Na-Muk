// src/components/AppContainer.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MoodCheck from './MoodCheck';
import FoodInput from './FoodInput';

const AppContainer = () => {
  const handleMoodSubmit = async (mood) => {
    try {
      const response = await fetch('/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) {
        // Handle non-OK responses
        console.error('Error saving data:', response.status, response.statusText);

        // Log the response content
        const responseText = await response.text();
        console.error('Response content:', responseText);

        return;
      }

      const data = await response.json();
      if (data.success) {
        console.log('Data saved successfully!');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Router>
      <div>
      <nav>
          <ul>
            <li>
              <Link to="/">Mood Check</Link>
            </li>
            <li>
              <Link to="/food-input">Food Input</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Routes>
        <Route
            path="/food-input"
            element={<FoodInput />}
          />
          <Route
            path="/"
            element={<MoodCheck onMoodSubmit={handleMoodSubmit} />}
          />
        </Routes>
      </div>
    </Router>
    );
  };
  export default AppContainer;