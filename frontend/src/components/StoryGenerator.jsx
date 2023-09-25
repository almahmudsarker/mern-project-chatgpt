import React, { useState } from 'react';
import generateStory from './generateStory';

function StoryGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');

  const handleGenerateStory = async () => {
    try {
      // Call the generateStory function with the user's prompt
      const story = await generateStory(prompt);
      setGeneratedStory(story);
    } catch (error) {
      console.error('Error generating story:', error);
    }
  };

  return (
    <div>
      <h2>Story Generator</h2>
      <textarea
        rows="4"
        cols="50"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your story prompt"
      />
      <button onClick={handleGenerateStory}>Generate Story</button>
      {generatedStory && (
        <div>
          <h3>Generated Story:</h3>
          <p>{generatedStory}</p>
        </div>
      )}
    </div>
  );
}

export default StoryGenerator;
