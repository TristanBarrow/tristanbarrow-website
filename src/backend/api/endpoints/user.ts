import { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as user_db from '../database/user';
import * as auth from '../../middleware/auth';

const jsonParser = bodyParser.json();

export const user = (app: Express) => {

    app.post('/api/login', jsonParser, (req: Request, res: Response) => {
        user_db.login(req.body.username, req.body.password, (err: any, result: any) => {
            if (err) {
                console.error(err);
                res.json({success: false, message: 'An unknown error has occurred, contact the admin' });
                throw new Error(err); 
            }
            if (result.success) {
                req.session.loggedIn = true;
                req.session.user_id = result.user_id;
                req.session.username = result.username;
                req.session.isAdmin = result.isAdmin;
                res.json({ success: true, message: "Logged In"});
            } else {
                res.json(result);
            }   
        });
    });

    app.get('/api/user/status', auth.std, (req: Request, res: Response) => {
        res.json({
            success: true, 
            user: req.session.username,
            isAdmin: req.session.isAdmin
        });
    });

    app.get('/api/logout', (req, res) => {
        req.session.destroy((err: Error) => {
            console.error(err);
        });
        res.json({ 
            success: true,
            message: 'Logged out'
        });
    })

    app.post('/api/user/create', jsonParser, (req: Request, res: Response) => {
        user_db.createUser(req.body.username, req.body.password, (err: any, result: any) => {
            if (err) {
                console.error(err);
                res.json({success: false, message: 'An unknown error has occurred, contact the admin' });
                throw new Error(err);
            } else {
                res.json(result);
            }
        })
    });

    app.get('/api/users', auth.tb, (req: Request, res: Response) => {
        user_db.getUsers((err, users) => {
            if (err) {
                console.error(err);
                res.json({success: false, message: 'An unknown error has occurred, contact the admin' });
                throw err;
            } else {
                res.json(users);
            }
        });
    });
}
