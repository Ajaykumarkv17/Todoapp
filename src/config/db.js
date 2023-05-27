const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ajaykumar17',
  password: 'AJay$2022',
  database: 'todoapp',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;