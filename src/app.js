const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + './public/index.html');
});

app.use('/todos', todoRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
