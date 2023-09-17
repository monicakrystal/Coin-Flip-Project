// Import the Express.js module
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'coinflip')));
app.use('/audio', express.static(path.join(__dirname, 'coinflip', 'audio')));
app.use('/images', express.static(path.join(__dirname, 'coinflip', 'images')));

// Define a route and a response
app.get('/', (req, res) => {
  // Read and send the HTML file
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the HTML file.');
    } else {
      res.send(data);
    }
  });
});

app.get('/flipcoin', (req, res) => {
  const result = Math.ceil(Math.random() * 2) === 1 ? 'heads' : 'tails';
  
  
  // Create a response object with the result and image URL
  const response = {
    result: result,
    imageUrl: `/images/${result}.png` 
  
  };
  
  res.setHeader('Content-Type', 'application/json');
  res.json(response);
});


app.get('/css/style.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'coinflip', 'css', 'style.css'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
