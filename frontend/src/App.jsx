import React from 'react';
import './App.css';
import Form from './components/Form';
import Story from './components/Story';
import Leaderboard from './components/Leaderboard';
import StoryGenerator from './components/StoryGenerator';

function App() {
  return (
    <div className="App">
      <h1>Your AI Story Generator</h1>
      <Form />
      <Story />
      <StoryGenerator />
      <Leaderboard />
    </div>
  );
}

export default App;
