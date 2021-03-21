import { ConfigObject } from '../config';


export const generateEndpoint = (config: ConfigObject) => {
    const location = ['src', 'backend', 'api', 'endpoints', 'gen', `${config.name}.ts`];
    return {
        location,
        template: generateEndpointsTemplate({
            name: config.name,
            capitalized: 'Todo'
        })
    }
}



type GenerateEndpointsTemplateArgs = {
    name: string
    capitalized: string
}

export const generateEndpointsTemplate = ({
    name,
    capitalized,
}: GenerateEndpointsTemplateArgs): string => {

return `import { Express, Request, Response } from 'express';
import jsonParser from '../../../middleware/jsonParser';
import * as auth from '../../../middleware/auth';
import * as db${capitalized} from '../../database/gen/${name}';

export const todo = (app: Express) => {

    app.post('/api/todos/create', auth.std, jsonParser,  (req: Request, res: Response) => {
        dbTodo.createTodo(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Creating the todo failed for some reason.'})
            } else {
                res.send(rows);
            }
        })
    });

    app.get('/api/todos', auth.std, (req: Request, res: Response) => {
        dbTodo.readTodos(req.session.user_id, false, (err: Error, rows: any) => {
            if (err) {
                console.log(err);
                res.send({success: false, message: 'getting the todos failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });

    app.put('/api/todos/update', auth.std, jsonParser, (req: Request, res: Response) => {
        dbTodo.updateTodo(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Updating the todo failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });

    app.delete('/api/todos/delete', auth.std, jsonParser, (req: Request, res: Response) => {
        dbTodo.deleteTodo(req.session.user_id, req.body.id, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Deleting the todo failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });
}`;
}



