import React, { useState } from 'react';

const ContinueStory = ({ onContinue }) => {
  const [continueText, setContinueText] = useState('');

  const handleContinue = () => {
    onContinue(continueText);
    setContinueText('');
  };

  return (
    <div>
      <h2>Continue the Story:</h2>
      <textarea
        rows="4"
        cols="50"
        value={continueText}
        onChange={(e) => setContinueText(e.target.value)}
        required
      />
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default ContinueStory;
