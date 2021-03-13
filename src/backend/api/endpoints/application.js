const index = require('../index.html.js');

const application = (app) => {
    app.get('/', (req, res) => {
        res.redirect('/app/home');
    });
    
    app.get('/app', (req, res) => {
        res.redirect('/app/home');
    });
    
    app.get('/api', (req, res) => {
        res.redirect('/app/docs');
    });
    
    app.get('/app/*', (req, res) => {
        res.send(index());
    });   
 
}

module.exports = application;