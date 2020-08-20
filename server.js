require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;
const index = require('./src/api/index.html.js');
const getScriptures = require('./src/api/getScriptures.js');
const getRandomScripture = require('./src/api/getRandomScripture.js');
const user = require('./src/api/database/user.js');

app.use(express.static(path.join(__dirname, 'served', 'public')));

app.get('/', (req, res) => {
    res.redirect('/app')
});

app.get('/app', (req, res) => {
    res.send(index());
});

app.get('/app/*', (req, res) => {
    res.send(index());
});
 
app.get('/bundle', (req, res) => {
    res.sendFile(path.join(__dirname, 'served', 'bundle.js'));
});

app.get('/api/users', (req, res) => {
    if (process.env.PRODUCTION === 'NO') {
        res.send('You are on local development environment');
    } else if (process.env.PRODUCTION === 'YES') {
        user.getUsers((users) => {
            res.json(users);
        });
    } else {
        throw new Error('Unknown Environment');
    }
});

app.get('/api', (req, res) => {
    res.redirect('/app')
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

app.get(`/api/scriptures/:test`, (req, res) => {
    const { test } = req.params;
    if (test === 'random') {
        res.json(getRandomScripture());
        return;
    } 
    const s = getScriptures(test, null);
    if (s === null) throw new Error (`404 - failed to find testament '${test}'`)
    res.json(s);
});

app.get('*', function(req, res){
    res.send("Catch All For Server")
});

app.listen(PORT, console.log('Listening on PORT: ' + PORT));
