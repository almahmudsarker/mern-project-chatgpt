const { ObjectId } = require('mongodb');
const db = require('../db');

// Define the 'stories' collection in MongoDB
const storiesCollection = db.collection('stories');

// Create a new story
async function createStory(title, content, authorId) {
  try {
    const result = await storiesCollection.insertOne({
      title,
      content,
      author: ObjectId(authorId), // Assuming authorId is a valid ObjectId
      createdAt: new Date(),
    });
    return result.ops[0];
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
}

// Get a story by ID
async function getStoryById(storyId) {
  try {
    const query = { _id: ObjectId(storyId) };
    return await storiesCollection.findOne(query);
  } catch (error) {
    console.error('Error fetching story:', error);
    throw error;
  }
}


module.exports = {
  createStory,
  getStoryById,
};
