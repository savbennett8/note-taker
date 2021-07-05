const express = require('express');
const fs = require('fs');
const path = require('path');
const noteData = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// //get notes from public html file
// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/notes.html'));
// });

//route to notes
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

// //or route to main page
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'));
// });

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});