import { user } from '../../endpoints/user';
import { query } from '../pool';

type DbProjectRow = {
    id: number
    title: string
    sub_title: string
    description: string
    link: string
    is_deleted: boolean
    user_id: number
}

type ProjectRow = {
    id: number
    title: string
    sub_title: string
    description: string
    link: string 
}

type CreateProject = {
    title: string
    sub_title: string
    description: string
    link: string
}

export const createProject = (
    user_id: number,
    project: CreateProject,
    callback: (err: Error, rows: any) => void
) => {
    const { title, sub_title, description, link } = project;
    const insertProjectQuery = 'INSERT INTO projects(title, sub_title, description, link, is_deleted, user_id) VALUES ($1, $2, $3, false, $4);';
    query(insertProjectQuery, [title, sub_title, description, link, user_id], (err: Error, res: any) => {
        if (err) {
            callback(err, null);
        }
        callback(err, { success: true, message: 'Created Project' });
    });
}

export const readProjects = (
    user_id: number,
    getDeleted: boolean,
    callback: (err: Error, rows: any) => void
) => {
    const selectAllProjectsQuery = 'SELECT id, title, sub_title, description, link, is_deleted FROM projects WHERE user_id = $1;';
    query(selectAllProjectsQuery, [user_id], (err: Error, result: any) => {
        let rows: ProjectRow[] = [];
        result.rows.forEach((row: DbProjectRow): void => {
            if (getDeleted || !row.is_deleted) {
                rows.push({
                    id: row.id,
                    title: row.title,
                    sub_title: row.sub_title,
                    description: row.description,
                    link: row.link,
                });
            } 
        });
        callback(err, rows);
    });
}

export const updateProject = (
    user_id: number, 
    project: ProjectRow,
    callback: (err: Error, rows: any) => void
) => {
    const { id, title, sub_title, description, link } = project;
    const selectProjectQuery = 'SELECT id FROM projects WHERE user_id = $1 AND id = $2;'
    query(selectProjectQuery, [user_id, id], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, {success: false, message: 'You dont have permision do update that project.'});
            return; 
        }
        const updateProjectsQuery = 'UPDATE projects SET title = $2, sub_title = $3, description = $4, link = $5 WHERE id = $1;'
        query(updateProjectsQuery, [id, title, sub_title, description, link], (err: Error, result: any) => {
            if (err) {
                callback(err, {success: false, message: 'The the database had a problem updating that project.'})
                return;
            }
            callback(err, {success: true, message: 'Project updated'});
        });
    });
}

export const deleteProject = (
    user_id: number,
    project_id: number,
    callback: (err: Error, rows: any) => void
) => {
    const selectProjectQuery = 'SELECT id FROM projects WHERE user_id = $1 AND id = $2;'
    query(selectProjectQuery, [user_id, project_id], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, {success: false, message: 'You dont have permision do delete that project.'});
            return; 
        }
        const deleteProjectsQuery = 'UPDATE projects SET is_deleted = true WHERE id = $1;'
        query(deleteProjectsQuery, [project_id], (err: Error, result: any) => {
            if (err) {
                callback(err, {success: false, message: 'The the database had a problem deleting that project.'})
                return;
            }
            callback(err, {success: true, message: 'Project deleted'});
        });
    });
}
