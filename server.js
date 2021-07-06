const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//get notes from public notes html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//or route to main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//---- API Routes ----//

const noteData = require('./db/db.json');

//update the database when a new note is created or deleted
function writeNotesTodb(notes) {
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Database updated!');
        return true;
    });
};

//get all notes
app.get('/api/notes', (req, res) => {
    res.json(noteData);
});

//create a new note
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    //assign id based on index in array
    req.body.id = noteData.length.toString();
    noteData.push(newNote);
    console.log('Note successfully created!');
    writeNotesTodb(noteData);
    res.json(req.body);
});

//delete note by id
app.delete('/api/notes/:id', (req, res) => {
    for (let i = 0; i < noteData.length; i++) {
        if (noteData[i].id === req.params.id) {
            noteData.splice(i, 1);
            break;
        }
    }
    console.log('Note successfully deleted!');
    writeNotesTodb(noteData);
    res.json(noteData);
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});