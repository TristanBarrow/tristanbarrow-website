const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'served', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'served', 'index.html'))
});

app.get('/bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'served', 'bundle.js'))
})

app.get('/app', (req, res) => {
    res.send('an app will go here')
});

app.listen(PORT, console.log('Listening on PORT: ' + PORT));
