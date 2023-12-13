// src/components/AppContainer.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // 탭 스타일을 위한 CSS 파일 추가
import MoodCheck from './MoodCheck';
import FoodInput from './FoodInput';
import './AppContainer.css';
import Visualization from './Visualization';
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
      <div className="app-container">
        <div className="header">
          <div className="project-name">
            <h1>
              <span className="highlight">오</span>늘도 <span className="highlight">나</span>는{' '}
              <span className="highlight">먹</span>는다
            </h1>
          </div>
          <nav>
            <Tabs>
              <TabList className="tab-list">
                <Tab>
                  <Link to="/">Mood Check</Link>
                </Tab>
                <Tab>
                  <Link to="/food-input">Food Input</Link>
                </Tab>
                <Tab>
                  <Link to="/visualization">Visualization</Link>
                </Tab>
              </TabList>
            </Tabs>
          </nav>
        </div>
        <div className="content">
          <Routes>
            <Route path="/food-input" element={<FoodInput />} />
            <Route
              path="/"
              element={<MoodCheck onMoodSubmit={handleMoodSubmit} />}
            />
            <Route
              path="/visualization"
              element={<Visualization />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppContainer;
