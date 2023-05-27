// routes/todoroutes.js

const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todoController');

// GET /todos - Get all todos
router.get('/', TodoController.getAllTodos);

// POST /todos - Create a new todo
router.post('/', TodoController.createTodo);

// DELETE /todos/:id - Delete a todo
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
