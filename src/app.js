const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const app = express();
const port = 3000;

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ajaykumar17',
  password: 'AJay$2022',
  database: 'todoapp',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../public/index.html');
  });

  app.use('/todos', todoRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
