// Import Express.js
const express = require('express');
const database = require('./db/db.json');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
const util = require("util");

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware pointing to the public folder
app.use(express.static('public'));

// Create Express.js routes for default '/' and '/notes' endpoints
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET all notes from db.json
app.get('/api/notes', (req, res) => res.json(database));

// POST Route to post a new note to db.json
app.post('/api/notes', (req, res) => {
  
  const { title, text } = req.body;
  
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid()
    };

    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err) => {
      if (err) {
        console.error(err);
      } else {

        // Add a new note
        database.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(database),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote
    };

    res.status(201).json(response);
  } else {
    res.status(500).json('Error in adding new note!');
  };
});

// Delete function for deleting notes
app.delete('/api/notes/:id', (req, res) => {
  
  const { title, text, id } = req.body;
  
  if (title && text && id) {
    const thisNote = {
      title,
      text,
      id: uuid()
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        fs.writeFile(
            './db/db.json',
            JSON.stringify(database),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        let database = JSON.parse(data);
        database = database.filter(entry => entry.id !== this.id);
        res.json(database);
      }
    });
  }
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);