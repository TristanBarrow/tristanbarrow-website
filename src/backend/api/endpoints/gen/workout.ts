import { Express, Request, Response } from 'express';
import jsonParser from '../../../middleware/jsonParser';
import * as auth from '../../../middleware/auth';
import * as dbWorkout from '../../database/gen/workout';

export const workout = (app: Express) => {

    app.post('/api/workouts/create', auth.std, jsonParser,  (req: Request, res: Response) => {
        dbWorkout.createWorkout(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Creating the workout failed for some reason.'})
            } else {
                res.send(rows);
            }
        })
    });

    app.get('/api/workouts', auth.std, (req: Request, res: Response) => {
        dbWorkout.readWorkouts(req.session.user_id, false, (err: Error, rows: any) => {
            if (err) {
                console.log(err);
                res.send({success: false, message: 'Getting the workouts failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });

    app.put('/api/workouts/update', auth.std, jsonParser, (req: Request, res: Response) => {
        dbWorkout.updateWorkout(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Updating the workout failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });

    app.delete('/api/workouts/delete', auth.std, jsonParser, (req: Request, res: Response) => {
        dbWorkout.deleteWorkout(req.session.user_id, req.body.id, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Deleting the workout failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });
}