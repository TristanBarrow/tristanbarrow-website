import { Express } from 'express';
import index from '../index.html';

export const application = (app: Express) => {
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