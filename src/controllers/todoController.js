// controllers/todocontroller.js

const TodoModel = require('../models/todoModel');

// Get all todos
function getAllTodos(req, res) {
  TodoModel.getAllTodos(function (err, todos) {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving todos from database' });
    }

    return res.json(todos);
  });
}

// Create a new todo
function createTodo(req, res) {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const todo = {
    title,
    description,
  };

  TodoModel.createTodo(todo, function (err, createdTodo) {
    if (err) {
      return res.status(500).json({ error: 'Error creating todo in database' });
    }

    return res.status(201).json(createdTodo);
  });
}

// Delete a todo
function deleteTodo(req, res) {
  const todoId = req.params.id;

  TodoModel.deleteTodo(todoId, function (err, deleted) {
    if (err) {
      return res.status(500).json({ error: 'Error deleting todo from database' });
    }

    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.sendStatus(204);
  });
}

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
};
