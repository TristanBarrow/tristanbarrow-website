import { ConfigObject } from '../config';
import { getAuth } from '../util/getAuth';
import { Template } from '../types/Template';

export const generateEndpoint = (config: ConfigObject): Template => {
    const location = ['src', 'backend', 'api', 'endpoints', 'gen', `${config.name}.ts`];
    const name = config.name;
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

    return {
        location,
        template: generateEndpointsTemplate({
            config,
            name: config.name,
            capitalized,
        })
    }
}

type GenerateEndpointsTemplateArgs = {
    config: ConfigObject
    name: string
    capitalized: string
}

export const generateEndpointsTemplate = ({
    config,
    name,
    capitalized,
}: GenerateEndpointsTemplateArgs): string => {

const header = `import { Express, Request, Response } from 'express';
import jsonParser from '../../../middleware/jsonParser';
import * as auth from '../../../middleware/auth';
import * as db${capitalized} from '../../database/gen/${name}';

export const ${name} = (app: Express) => {
`;

const createAuth = getAuth(config.crud.create); 

const create = `
    app.post('/api/${name}s/create',${createAuth} jsonParser,  (req: Request, res: Response) => {
        db${capitalized}.create${capitalized}(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Creating the todo failed for some reason.'})
            } else {
                res.send(rows);
            }
        })
    });
`;

const readAuth = getAuth(config.crud.read); 

const read = `
    app.get('/api/${name}s',${readAuth} (req: Request, res: Response) => {
        db${capitalized}.read${capitalized}s(req.session.user_id, false, (err: Error, rows: any) => {
            if (err) {
                console.log(err);
                res.send({success: false, message: 'getting the ${name}s failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });
`;

const updateAuth = getAuth(config.crud.update); 

const update = `
    app.put('/api/${name}s/update',${updateAuth} jsonParser, (req: Request, res: Response) => {
        db${capitalized}.update${capitalized}(req.session.user_id, req.body, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Updating the ${name} failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });
`;

const removeAuth = getAuth(config.crud.remove); 

const remove = `
    app.delete('/api/${name}s/delete',${removeAuth} jsonParser, (req: Request, res: Response) => {
        db${capitalized}.delete${capitalized}(req.session.user_id, req.body.id, (err: Error, rows: any) => {
            if (err) {
                console.error(err);
                res.send({success: false, message: 'Deleting the ${name} failed for some reason.'})
            } else {
                res.send(rows);
            }
        });
    });
`;

    const footer = `}`;

    let result = header ;

    if (config.crud.all) {
        result += create;
        result += read;
        result += update;
        result += remove;
    } else {
        if (config.crud.create) result += create;
        if (config.crud.read)   result += read;
        if (config.crud.update) result += update;
        if (config.crud.remove) result += remove;
    }

    result = result + footer;
    return result;
}



