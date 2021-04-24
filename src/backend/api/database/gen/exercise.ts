import { user } from '../../endpoints/user';
import { query } from '../pool';

type DbExerciseRow = {
    id: number
    name: string
    description: string
    is_deleted: boolean
    user_id: number
}

type ExerciseRow = {
    id: number
    name: string
    description: string 
}

type CreateExercise = {
    name: string
    description: string
}

export const createExercise = (
    user_id: number,
    exercise: CreateExercise,
    callback: (err: Error, rows: any) => void
) => {
    const { name, description } = exercise;
    const insertExerciseQuery = 'INSERT INTO exercises(name, description, is_deleted, user_id) VALUES ($1, $2, $3, false, $4);';
    query(insertExerciseQuery, [name, description, user_id], (err: Error, res: any) => {
        if (err) {
            callback(err, null);
        }
        callback(err, { success: true, message: 'Created Exercise' });
    });
}

export const readExercises = (
    user_id: number,
    getDeleted: boolean,
    callback: (err: Error, rows: any) => void
) => {
    const selectAllExercisesQuery = 'SELECT id, name, description, is_deleted FROM exercises WHERE user_id = $1;';
    query(selectAllExercisesQuery, [user_id], (err: Error, result: any) => {
        let rows: ExerciseRow[] = [];
        result.rows.forEach((row: DbExerciseRow): void => {
            if (getDeleted || !row.is_deleted) {
                rows.push({
                    id: row.id,
                    name: row.name,
                    description: row.description,
                });
            } 
        });
        callback(err, rows);
    });
}

export const updateExercise = (
    user_id: number, 
    exercise: ExerciseRow,
    callback: (err: Error, rows: any) => void
) => {
    const { id, name, description } = exercise;
    const selectExerciseQuery = 'SELECT id FROM exercises WHERE user_id = $1 AND id = $2;'
    query(selectExerciseQuery, [user_id, id], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, {success: false, message: 'You dont have permision do update that exercise.'});
            return; 
        }
        const updateExercisesQuery = 'UPDATE exercises SET name = $2, description = $3 WHERE id = $1;'
        query(updateExercisesQuery, [id, name, description], (err: Error, result: any) => {
            if (err) {
                callback(err, {success: false, message: 'The the database had a problem updating that exercise.'})
                return;
            }
            callback(err, {success: true, message: 'Exercise updated'});
        });
    });
}
