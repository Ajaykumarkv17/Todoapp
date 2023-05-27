// models/todomodel.js

const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'ajaykumar17',
  password: 'AJay$2022',
  database: 'todoapp',
});

// Get all todos from the database
function getAllTodos(callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.error('Error connecting to database:', err);
      return callback(err, null);
    }

    connection.query('SELECT * FROM todos', function (err, results) {
      connection.release();

      if (err) {
        console.error('Error retrieving todos:', err);
        return callback(err, null);
      }

      return callback(null, results);
    });
  });
}

// Create a new todo in the database
function createTodo(todo, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.error('Error connecting to database:', err);
      return callback(err, null);
    }

    connection.query('INSERT INTO todos SET ?', todo, function (err, result) {
      connection.release();

      if (err) {
        console.error('Error creating todo:', err);
        return callback(err, null);
      }

      const createdTodo = { id: result.insertId, ...todo };
      return callback(null, createdTodo);
    });
  });
}

// Delete a todo from the database
function deleteTodo(todoId, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.error('Error connecting to database:', err);
      return callback(err);
    }

    connection.query('DELETE FROM todos WHERE id = ?', todoId, function (err, result) {
      connection.release();

      if (err) {
        console.error('Error deleting todo:', err);
        return callback(err);
      }

      if (result.affectedRows === 0) {
        // No todo with the given ID found
        return callback(null, false);
      }

      return callback(null, true);
    });
  });
}

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
};
