const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Welcome to tristanbarrow.com');
});

app.get('/byui-linux-lab', (req, res) => {
    res.send('barrowt@157.201.194.203 -p 215\n');
});

app.listen(PORT, console.log('Listening on PORT: ' + PORT));
