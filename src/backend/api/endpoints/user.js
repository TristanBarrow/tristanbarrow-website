const bodyParser = require('body-parser');
const user = require('../database/user.js');
const auth = require('../../middleware/auth.js');
const jsonParser = bodyParser.json();

module.exports = (app) => {

    app.post('/api/login', jsonParser, (req, res) => {
        user.login(req.body.username, req.body.password, (err, result) => {
            if (err) {
                console.error(err);
                res.json({success: false, message: 'An unknown error has occurred, contact the admin' });
                throw new Error(err); 
            }
            if (result.success) {
                req.session.loggedIn = true;
                req.session.username = result.username;
                req.session.isAdmin = result.isAdmin;
                res.json({ success: true, message: "Logged In"});
            } else {
                res.json(result);
            }   
        });
    });

    app.get('/api/user/status', auth.std, (req, res) => {
        res.json({
            success: true, 
            user: req.session.username,
            isAdmin: req.session.isAdmin
        });
    });

    app.get('/api/logout', (req, res) => {
        req.session.destroy();
        res.json({ 
            success: true,
            message: 'Logged out'
        });
    })

    app.post('/api/user/create', jsonParser, (req, res) => {
        user.createUser(req.body.username, req.body.password, (err, result) => {
            if (err) {
                console.error(err);
                res.json({success: false, message: 'An unknown error has occurred, contact the admin' });
                throw new Error(err);
            } else {
                res.json(result);
            }
        })
    });

    app.get('/api/users', auth.tb, (req, res) => {
        user.getUsers((err, users) => {
            if (err) {
                console.error(err);
                res.json({success: false, message: 'An unknown error has occurred, contact the admin' });
                throw new Error(err);
            } else {
                res.json(users);
            }
        });
    });
}
