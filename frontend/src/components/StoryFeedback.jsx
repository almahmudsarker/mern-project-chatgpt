import React, { useState } from 'react';

const StoryFeedback = ({ storyId, onFeedbackSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [tags, setTags] = useState([]);

  const handleFeedbackSubmit = () => {
    // Submit feedback and tags to the backend
    onFeedbackSubmit(storyId, feedback, tags);
    setFeedback('');
    setTags([]);
  };

  return (
    <div>
      <h2>Provide Feedback:</h2>
      <textarea
        rows="4"
        cols="50"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
      />
      <div>
        <label>Tags:</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value.split(','))}
        />
      </div>
      <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
    </div>
  );
};

export default StoryFeedback;
