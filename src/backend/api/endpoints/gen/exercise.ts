import { Express, Request, Response } from 'express';
import jsonParser from '../../../middleware/jsonParser';
import * as auth from '../../../middleware/auth';
import * as dbExercise from '../../database/gen/exercise';

export const exercise = (app: Express) => {

    app.post('/api/exercises/create', auth.admin, jsonParser,  (req: Request, res: Response) => {
        dbExercise.createExercise(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Creating the exercise failed for some reason.'})
            } else {
                res.send(rows);
            }
        })
    });

    app.get('/api/exercises', (req: Request, res: Response) => {
        dbExercise.readExercises(req.session.user_id, false, (err: Error, rows: any) => {
            if (err) {
                console.log(err);
                res.send({success: false, message: 'Getting the exercises failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });

    app.put('/api/exercises/update', auth.admin, jsonParser, (req: Request, res: Response) => {
        dbExercise.updateExercise(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Updating the exercise failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });
}