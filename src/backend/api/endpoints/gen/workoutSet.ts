import { Express, Request, Response } from 'express';
import jsonParser from '../../../middleware/jsonParser';
import * as auth from '../../../middleware/auth';
import * as dbWorkoutSet from '../../database/gen/workoutSet';

export const workoutSet = (app: Express) => {

    app.post('/api/workoutSets/create', auth.std, jsonParser,  (req: Request, res: Response) => {
        dbWorkoutSet.createWorkoutSet(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Creating the workoutSet failed for some reason.'})
            } else {
                res.send(rows);
            }
        })
    });

    app.get('/api/workoutSets', auth.std, (req: Request, res: Response) => {
        dbWorkoutSet.readWorkoutSets(req.session.user_id, false, (err: Error, rows: any) => {
            if (err) {
                console.log(err);
                res.send({success: false, message: 'Getting the workoutSets failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });

    app.put('/api/workoutSets/update', auth.std, jsonParser, (req: Request, res: Response) => {
        dbWorkoutSet.updateWorkoutSet(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Updating the workoutSet failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });

    app.delete('/api/workoutSets/delete', auth.std, jsonParser, (req: Request, res: Response) => {
        dbWorkoutSet.deleteWorkoutSet(req.session.user_id, req.body.id, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Deleting the workoutSet failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });
}