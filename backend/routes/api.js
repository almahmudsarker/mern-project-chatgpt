const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Import necessary controllers
const storiesController = require('../controllers/stories');
const authController = require('../controllers/auth'); 
// Story routes
router.get('/stories', storiesController.getAllStories);
router.post('/stories', storiesController.createStory);
router.get('/stories/:id', storiesController.getStoryById);
router.post('/stories/:id/upvote', storiesController.upvoteStory);

// Route for continuing a story
router.post('/stories/:id/continue', storiesController.continueStory);

// Route for submitting feedback on a story
router.post('/stories/:id/feedback', storiesController.submitFeedback);


// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
