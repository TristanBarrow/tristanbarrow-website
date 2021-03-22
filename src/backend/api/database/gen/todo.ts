import { user } from '../../endpoints/user';
import { query } from '../pool';

type DbTodoRow = {
    id: number
    name: string
    description: string
    is_finished: boolean
    is_deleted: boolean
    user_id: number
}

type TodoRow = {
    id: number
    name: string
    description: string
    is_finished: boolean 
}

type CreateTodo = {
    name: string
    description: string
    is_finished: boolean
}

export const createTodo = (
    user_id: number,
    todo: CreateTodo,
    callback: (err: Error, rows: any) => void
) => {
    const { name, description, is_finished } = todo;
    const insertTodoQuery = 'INSERT INTO todos(name, description, is_finished, is_deleted, user_id) VALUES ($1, $2, $3, false, $4);';
    query(insertTodoQuery, [name, description, is_finished, user_id], (err: Error, res: any) => {
        if (err) {
            callback(err, null);
        }
        callback(err, { success: true, message: 'Created Todo' });
    });
}

export const readTodos = (
    user_id: number,
    getDeleted: boolean,
    callback: (err: Error, rows: any) => void
) => {
    const selectAllTodosQuery = 'SELECT id, name, description, is_finished, is_deleted FROM todos WHERE user_id = $1;';
    query(selectAllTodosQuery, [user_id], (err: Error, result: any) => {
        let rows: TodoRow[] = [];
        result.rows.forEach((row: DbTodoRow): void => {
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

export const updateTodo = (
    user_id: number, 
    todo: TodoRow,
    callback: (err: Error, rows: any) => void
) => {
    const { id, name, description, is_finished } = todo;
    const selectTodoQuery = 'SELECT id FROM todos WHERE user_id = $1 AND id = $2;'
    query(selectTodoQuery, [user_id, id], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, {success: false, message: 'You dont have permision do update that todo.'});
            return; 
        }
        const updateTodosQuery = 'UPDATE todos SET name = $2, description = $3, is_finished = $4 WHERE id = $1;'
        query(updateTodosQuery, [id, name, description, is_finished], (err: Error, result: any) => {
            if (err) {
                callback(err, {success: false, message: 'The the database had a problem updating that todo.'})
                return;
            }
            callback(err, {success: true, message: 'Todo updated'});
        });
    });
}

export const deleteTodo = (
    user_id: number,
    todo_id: number,
    callback: (err: Error, rows: any) => void
) => {
    const selectTodoQuery = 'SELECT id FROM todos WHERE user_id = $1 AND id = $2;'
    query(selectTodoQuery, [user_id, todo_id], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, {success: false, message: 'You dont have permision do delete that todo.'});
            return; 
        }
        const deleteTodosQuery = 'UPDATE todos SET is_deleted = true WHERE id = $1;'
        query(deleteTodosQuery, [todo_id], (err: Error, result: any) => {
            if (err) {
                callback(err, {success: false, message: 'The the database had a problem deleting that todo.'})
                return;
            }
            callback(err, {success: true, message: 'Todo deleted'});
        });
    });
}
