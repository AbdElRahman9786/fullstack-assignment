const express = require('express');
const router = express.Router();
const { createTask, getUserTasks, updateTask, deleteTask } = require('../controller/taskCntroller');
const authMiddleware = require('../middleware/auth');

// All task routes require authentication
router.use(authMiddleware);

// Create a new task
router.post('/', createTask);

// Get all tasks for logged-in user
router.get('/', getUserTasks);

// Update a task
router.put('/:id', updateTask);

// Delete a task
router.delete('/:id', deleteTask);

module.exports = router;
