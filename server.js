const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

const getScriptures = require('./src/api/scriptures.js');

app.use(express.static(path.join(__dirname, 'served', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'served', 'index.html'))
});

app.get('/bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'served', 'bundle.js'))
})

app.get('/api', (req, res) => {
    res.send('an api will go here')
});

app.get(`/api/scriptures/:test/:book/:chapter/:verse`, (req, res) => {
    const { test, book, chapter, verse } = req.params;
    const s = getScriptures(test, book, chapter, verse, null);
    if (s === null) throw new Error (`404 - failed to find verse '${test}/${book}/${chapter}/${verse}'`)
    res.json(s);
});

app.get(`/api/scriptures/:test/:book/:chapter`, (req, res) => {
    const { test, book, chapter } = req.params;
    const s = getScriptures(test, book, chapter, null);
    if (s === null) throw new Error (`404 - failed to find chapter or verse '${test}/${book}/${chapter}'`)
    res.json(s);
});

app.get(`/api/scriptures/:test/:book`, (req, res) => {
    const { test, book } = req.params;
    const s = getScriptures(test, book, null);
    if (s === null) throw new Error (`404 - failed to find book or section '${test}/${book}'`)
    res.json(s);
});

app.get(`/api/scriptures/:test`, (req, res, next) => {
    const { test } = req.params;
    const s = getScriptures(test, null);
    if (s === null) throw new Error (`404 - failed to find testament '${test}'`)
    res.json(s);
});

app.get('*', function(req, res){
    res.send('what???');
});

app.listen(PORT, console.log('Listening on PORT: ' + PORT));
