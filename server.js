require('dotenv').config();
const express = require('express');
const app = express();

const session = require('express-session');
const pool = require('./src/api/database/pool.js').pool;
const pgSession = require('connect-pg-simple')(session);
const auth = require('./src/middleware/auth.js');

const path = require('path');

const index = require('./src/api/index.html.js');
const getScriptures = require('./src/api/getScriptures.js');
const getRandomScripture = require('./src/api/getRandomScripture.js');
const user = require('./src/api/database/user.js');
const bookmarks = require('./src/api/database/bookmarks.js');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


app.use(session({
    store: new pgSession({ pool }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

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

app.post('/api/login', jsonParser, (req, res) => {
    user.login(req.body.username, req.body.password, (err, result) => {
        if (err) {
            if (err.fatal=== false) {
                res.send(err.message)
                return;
            }
        }
        try {
            if (result === true) {
                req.session.loggedIn = true;
                req.session.user = req.body.username;
            }
            res.json({success: result});
        } catch (e) {
            console.error(e);
            // res.setStatus(500)

            res.send({message: 'User does not exist'});
        }
    });
});

app.get('/api/user/current', (req, res) => {
    if (req.session.loggedIn) {
        res.json({
            loggedIn: req.session.loggedIn,
            user: req.session.user
        });
    } else {
        res.json({
            loggedIn: false,
            user: null
        });
    }
    
});

app.get('/api/logout', (req, res) => {
    req.session.loggedIn = false;
    req.session.user = null;
    res.json({ 
        success: true,
    });
})

app.post('/api/user/create', jsonParser, (req, res) => {
    user.createUser(req.body.username, req.body.password, (err, result) => {
        if (err) console.error(err);
        res.json(result);
    })
});

app.get('/api/users', auth.tb, (req, res) => {
    user.getUsers((err, users) => {
        // console.log(users)
        res.json(users);
    });
});

app.get('/api/bookmarks', auth.std, (req, res) => {
    bookmarks.getBookmarks(req.session.user, (err, response) => {
        res.json(response);
    });
});

app.get('/api/bookmark', auth.std, (req, res) => {
    bookmarks.getBookmark('mark', (err, response) => {
        console.log(response)
        res.json(response);
    });
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

app.get('*', function(req, res) {
    res.json({ message: 'Not found' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log('Listening on PORT: ' + PORT));
