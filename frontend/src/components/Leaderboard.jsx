import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    // Fetch and set top-voted stories from the backend API
      fetch('/api/top-stories')
      .then((response) => response.json())
      .then((data) => setTopStories(data));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {topStories.map((story) => (
          <li key={story._id}>
            <span>{story.title}</span>
            <span>{story.votes} votes</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
