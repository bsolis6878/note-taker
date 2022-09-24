const express = require('express');
const path = require('path');

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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// sets port for server to listen on
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});