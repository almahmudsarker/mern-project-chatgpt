const { ObjectId } = require('mongodb');
const db = require('../db'); // Initialize your MongoDB client

// Get all stories
exports.getAllStories = async (req, res) => {
  try {
    const stories = await db.collection('stories').find().toArray();
    res.json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new story
exports.createStory = async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await db.collection('stories').insertOne({ prompt, votes: 0 });
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a story by ID
exports.getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await db.collection('stories').findOne({ _id: ObjectId(id) });
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Upvote a story
exports.upvoteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection('stories').updateOne(
      { _id: ObjectId(id) },
      { $inc: { votes: 1 } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json({ message: 'Upvoted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Continue a story
exports.continueStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { continuation } = req.body;

    // Fetch the existing story by ID
    const existingStory = await db.collection('stories').findOne({ _id: ObjectId(id) });
    if (!existingStory) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Combine the existing story and continuation text
    const continuedStory = `${existingStory.story}\n${continuation}`;

    // Update the story with the continuation
    const result = await db.collection('stories').updateOne(
      { _id: ObjectId(id) },
      { $set: { story: continuedStory } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Could not continue the story' });
    }

    res.json({ message: 'Story continued successfully' });
  } catch (error) {
    console.error('Error continuing the story:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Submit feedback on a story
exports.submitFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback, tags } = req.body;

    // Update the story with feedback and tags
    const result = await db.collection('stories').updateOne(
      { _id: ObjectId(id) },
      { $push: { feedback: feedback }, $set: { tags: tags } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Could not submit feedback' });
    }

    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
