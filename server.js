const express = require('express');
const fs = require('fs');
const path = require('path');
const noteData = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get notes from public html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//or route to main page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//---- API Routes ----//

app.route('/api/notes')
    //get all notes - updates when notes are added or deleted
    .get(function (req, res) {
        res.json(noteData);
    })
    //post a note
    .post(function (req, res) {
        let filePath = path.join(__dirname, './db/db.json');
        let newNote = req.body;
        let id;

        for (let i = 0; i < noteData.length; i++) {
            let newNoteId = noteData[i];

            if (newNoteId > noteData[i]) {
                id = newNoteId.id
            }
        }

        newNoteId.id = id + 1;
        noteData.push(newNote);

        fs.writeFile(filePath, JSON.stringify(noteData), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('Note successfully saved!');
        });

        res.json(newNote);
    });

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});