import { Express, Request, Response } from 'express';
import jsonParser from '../../../middleware/jsonParser';
import * as auth from '../../../middleware/auth';
import * as dbProject from '../../database/gen/project';

export const project = (app: Express) => {

    app.post('/api/projects/create', auth.admin, jsonParser,  (req: Request, res: Response) => {
        dbProject.createProject(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Creating the project failed for some reason.'})
            } else {
                res.send(rows);
            }
        })
    });

    app.get('/api/projects', (req: Request, res: Response) => {
        dbProject.readProjects(req.session.user_id, false, (err: Error, rows: any) => {
            if (err) {
                console.log(err);
                res.send({success: false, message: 'Getting the projects failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });

    app.put('/api/projects/update', auth.admin, jsonParser, (req: Request, res: Response) => {
        dbProject.updateProject(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Updating the project failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });

    app.delete('/api/projects/delete', auth.admin, jsonParser, (req: Request, res: Response) => {
        dbProject.deleteProject(req.session.user_id, req.body.id, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Deleting the project failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });
}