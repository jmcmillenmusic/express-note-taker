const notes = require('express').Router();
const fs = require('fs');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// // POST Route to post a new note to db.json
// notes.post('/', (req, res) => {
  
//   const { title, text } = req.body;
  
//   if (title && text) {
//     const newNote = {
//       title,
//       text
//     };

//     // Obtain existing notes
//     fs.readFile('./../db/db.json', 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         // Convert string into JSON object
//         const parsedNotes = JSON.parse(data);

//         // Add a new note
//         parsedNotes.push(newNote);

//         // Write updated notes back to the file
//         fs.writeFile(
//           './../db/db.json',
//           JSON.stringify(parsedNotes, null, 4),
//           (writeErr) =>
//             writeErr
//               ? console.error(writeErr)
//               : console.info('Successfully updated notes!')
//         );
//       }
//     });

//     const response = {
//       status: 'success',
//       body: newNote
//     };

//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in adding new note!');
//   }
// });