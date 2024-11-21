// create web server
// create web server
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const comments = require('./comments.json');
const fs = require('fs');
const path = './comments.json';

app.use(bodyParser.json());
app.use(cookieParser());

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);

  fs.writeFile(path, JSON.stringify(comments), err => {
    if (err) {
      res.status(500).send('Error saving new comment');
    } else {
      res.json(newComment);
    }
  });
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const updatedComment = req.body;

  comments[id] = updatedComment;

  fs.writeFile(path, JSON.stringify(comments), err => {
    if (err) {
      res.status(500).send('Error updating comment');
    } else {
      res.json(updatedComment);
    }
  });
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;

  comments.splice(id, 1);

  fs.writeFile(path, JSON.stringify(comments), err => {
    if (err) {
      res.status(500).send('Error deleting comment');
    } else {
      res.send('Comment deleted');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});