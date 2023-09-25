import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prompt);
    setPrompt('');
  };

  return (
    <div>
      <h2>Enter Your Story Prompt:</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit">Generate Story</button>
      </form>
    </div>
  );
};

export default Form;
