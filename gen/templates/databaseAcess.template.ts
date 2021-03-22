import { ConfigObject } from '../config';
import { Template } from '../types/Template';

export const generateDatabaseAccess = (config: ConfigObject): Template => {
    const location = ['src', 'backend', 'api', 'database', 'gen', `${config.name}.ts`];
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

type GenerateDatabaseTemplateArgs = {
    config: ConfigObject
    name: string
    capitalized: string
}

export const generateEndpointsTemplate = ({
    config,
    name,
    capitalized,
}: GenerateDatabaseTemplateArgs): string => {

const header = `import { user } from '../../endpoints/user';
import { query } from '../pool';

type Db${capitalized}Row = {
    id: number
    name: string
    description: string
    is_finished: boolean
    is_deleted: boolean
    user_id: number
}

type ${capitalized}Row = {
    id: number
    name: string
    description: string
    is_finished: boolean   
}

type Create${capitalized} = {
    name: string
    description: string
    is_finished: boolean
}
`;

const create = `
export const create${capitalized} = (
    user_id: number,
    ${name}: Create${capitalized},
    callback: (err: Error, rows: any) => void
) => {
    const { name, description, is_finished } = ${name};
    const insert${capitalized}Query = 'INSERT INTO ${name}s(name, description, is_finished, is_deleted, user_id) VALUES ($1, $2, $3, false, $4);';
    query(insert${capitalized}Query, [name, description, is_finished, user_id], (err: Error, res: any) => {
        if (err) {
            callback(err, null);
        }
        callback(err, { success: true, message: 'Created ${capitalized}' });
    });
}
`;

const read = `
export const read${capitalized}s = (
    user_id: number,
    getDeleted: boolean,
    callback: (err: Error, rows: any) => void
) => {
    const selectAll${capitalized}sQuery = 'SELECT id, name, description, is_finished, is_deleted FROM ${name}s WHERE user_id = $1;';
    query(selectAll${capitalized}sQuery, [user_id], (err: Error, result: any) => {
        let rows: ${capitalized}Row[] = [];
        result.rows.forEach((row: Db${capitalized}Row): void => {
            if (getDeleted || !row.is_deleted) {
                rows.push({
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    is_finished: row.is_finished,
                });
            } 
        });
        callback(err, rows);
    });
}
`;

const update = `
export const update${capitalized} = (
    user_id: number, 
    ${name}: ${capitalized}Row,
    callback: (err: Error, rows: any) => void
) => {
    const { id, name, description, is_finished } = ${name};
    const select${capitalized}Query = 'SELECT id FROM ${name}s WHERE user_id = $1 AND id = $2;'
    query(select${capitalized}Query, [user_id, id], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, {success: false, message: 'You dont have permision do update that ${name}.'});
            return; 
        }
        const update${capitalized}sQuery = 'UPDATE ${name}s SET name = $2, description = $3, is_finished = $4 WHERE id = $1;'
        query(update${capitalized}sQuery, [id, name, description, is_finished], (err: Error, result: any) => {
            if (err) {
                callback(err, {success: false, message: 'The the database had a problem updating that ${name}.'})
                return;
            }
            callback(err, {success: true, message: '${capitalized} updated'});
        });
    });
}
`;

const remove = `
export const delete${capitalized} = (
    user_id: number,
    ${name}_id: number,
    callback: (err: Error, rows: any) => void
) => {
    const select${capitalized}Query = 'SELECT id FROM ${name}s WHERE user_id = $1 AND id = $2;'
    query(select${capitalized}Query, [user_id, ${name}_id], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, {success: false, message: 'You dont have permision do delete that ${name}.'});
            return; 
        }
        const delete${capitalized}sQuery = 'UPDATE ${name}s SET is_deleted = true WHERE id = $1;'
        query(delete${capitalized}sQuery, [${name}_id], (err: Error, result: any) => {
            if (err) {
                callback(err, {success: false, message: 'The the database had a problem deleting that ${name}.'})
                return;
            }
            callback(err, {success: true, message: '${capitalized} deleted'});
        });
    });
}
`;

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

    return result;
}