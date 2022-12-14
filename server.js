const express = require('express');
const path = require('path');
const fs = require('fs')
const notes = require('./db/db.json');

// sets port number to listen on
const PORT = process.env.PORT || 3001;
const app = express();

// serves files in public folder
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length += 1;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let currentNotes = JSON.parse(data);
        currentNotes.push(req.body);
        fs.writeFile('./db/db.json', JSON.stringify(currentNotes), (err) => {
            if (err) {
                console.log(err);
            }
        })
    });
    res.json();
})

app.delete('/api/notes/:id', (req, res) => {
    let notesId = parseInt(req.params.id);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        currentNotes = JSON.parse(data);
        let newNote = currentNotes.filter(note => note.id !== notesId);
        fs.writeFile('./db/db.json', JSON.stringify(newNote), (err) => {
            if (err) {
                console.log(err);
            }
        })
        res.json(newNote);
    })
})

// sets port for server to listen on
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});