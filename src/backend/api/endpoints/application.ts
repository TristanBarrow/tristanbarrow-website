import { Express } from 'express';
import index from '../index.html';
import config from '../../../../gen/config';
import * as auth from '../../middleware/auth';

export const application = (app: Express) => {
    app.get('/', (req, res) => {
        res.redirect('/app/home');
    });
    
    app.get('/app', (req, res) => {
        res.redirect('/app/home');
    });

    app.get('/login', (req, res) => {
        res.redirect('/app/login');
    });

    app.get('/create_account', (req, res) => {
        res.redirect('/app/create_account');
    });

    app.get('/api', (req, res) => {
        res.redirect('/app/docs/api');
    });
    
    app.get('/app/*', (req, res) => {
        res.send(index());
    });

    app.get('/api/model_config', auth.admin, (req, res) => {
        res.json(config);
    });
 
}