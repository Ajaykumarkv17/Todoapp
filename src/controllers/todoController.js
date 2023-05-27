const Todo = require('../models/todoModel');

exports.getAllTodos = (req, res) => {
  Todo.getAll((err, todos) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve todos' });
      return;
    }
    res.json(todos);
  });
};

exports.createTodo = (req, res) => {
  const { title, description } = req.body;
  Todo.create({ title, description }, (err, insertedId) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create todo' });
      return;
    }
    res.json({ id: insertedId, title, description });
  });
};