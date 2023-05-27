const db = require('../config/db');

class Todo {
  static getAll(callback) {
    db.query('SELECT * FROM todos', (err, results) => {
      if (err) {
        console.error('Error retrieving todos: ', err);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  static create(data, callback) {
    const { title, description } = data;
    db.query(
      'INSERT INTO todos (title, description) VALUES (?, ?)',
      [title, description],
      (err, results) => {
        if (err) {
          console.error('Error creating todo: ', err);
          callback(err, null);
          return;
        }
        callback(null, results.insertId);
      }
    );
  }
}

module.exports = Todo;