const express = require('express');
const path = require('path');
const { currentNotes } = require('./db/db.json');
// const { handleNoteSave, saveNote, getAndRenderNotes, renderActiveNote, getNotes, renderNoteList } = require('./public/assets/js/index')

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
    res.json(req.body);
})

// sets port for server to listen on
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});