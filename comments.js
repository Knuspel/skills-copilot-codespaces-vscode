// Create web server with express
const express = require('express');
const app = express();
const PORT = 3000;

// Create a comments array
const comments = [
  {
    username: 'Tammy',
    comment: 'lol that is so funny!',
    createdAt: '6/17/2020'
  },
  {
    username: 'FishBoi',
    comment: 'plz delete this post',
    createdAt: '6/19/2020'
  },
  {
    username: 'Haha',
    comment: 'I love this post!',
    createdAt: '6/20/2020'
  }
];

// Create a route to get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create a route to get a specific comment
app.get('/comments/:username', (req, res) => {
  const username = req.params.username;
  const comment = comments.find(comment => comment.username === username);
  res.json(comment);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
