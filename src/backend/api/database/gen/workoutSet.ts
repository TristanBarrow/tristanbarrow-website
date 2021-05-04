import { user } from '../../endpoints/user';
import { query } from '../pool';

type DbWorkoutSetRow = {
    id: number
    workout: number
    exercise: number
    workoutOrder: number
    resistance: number
    reps: number
    side: string
    notes: string
    is_deleted: boolean
    user_id: number
}

type WorkoutSetRow = {
    id: number
    workout: number
    exercise: number
    workoutOrder: number
    resistance: number
    reps: number
    side: string
    notes: string 
}

type CreateWorkoutSet = {
    workout: number
    exercise: number
    workoutOrder: number
    resistance: number
    reps: number
    side: string
    notes: string
}

export const createWorkoutSet = (
    user_id: number,
    workoutSet: CreateWorkoutSet,
    callback: (err: Error, rows: any) => void
) => {
    const { workout, exercise, workoutOrder, resistance, reps, side, notes } = workoutSet;
    const insertWorkoutSetQuery = 'INSERT INTO workoutSets(workout, exercise, workoutOrder, resistance, reps, side, notes, is_deleted, user_id) VALUES ($1, $2, $3, false, $4);';
    query(insertWorkoutSetQuery, [workout, exercise, workoutOrder, resistance, reps, side, notes, user_id], (err: Error, res: any) => {
        if (err) {
            callback(err, null);
        }
        callback(err, { success: true, message: 'Created WorkoutSet' });
    });
}

export const readWorkoutSets = (
    user_id: number,
    getDeleted: boolean,
    callback: (err: Error, rows: any) => void
) => {
    const selectAllWorkoutSetsQuery = 'SELECT id, workout, exercise, workoutOrder, resistance, reps, side, notes, is_deleted FROM workoutSets WHERE user_id = $1;';
    query(selectAllWorkoutSetsQuery, [user_id], (err: Error, result: any) => {
        let rows: WorkoutSetRow[] = [];
        result.rows.forEach((row: DbWorkoutSetRow): void => {
            if (getDeleted || !row.is_deleted) {
                rows.push({
                    id: row.id,
                    workout: row.workout,
                    exercise: row.exercise,
                    workoutOrder: row.workoutOrder,
                    resistance: row.resistance,
                    reps: row.reps,
                    side: row.side,
                    notes: row.notes,
                });
            } 
        });
        callback(err, rows);
    });
}

export const updateWorkoutSet = (
    user_id: number, 
    workoutSet: WorkoutSetRow,
    callback: (err: Error, rows: any) => void
) => {
    const { id, workout, exercise, workoutOrder, resistance, reps, side, notes } = workoutSet;
    const selectWorkoutSetQuery = 'SELECT id FROM workoutSets WHERE user_id = $1 AND id = $2;'
    query(selectWorkoutSetQuery, [user_id, id], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, {success: false, message: 'You dont have permision do update that workoutSet.'});
            return; 
        }
        const updateWorkoutSetsQuery = 'UPDATE workoutSets SET workout = $2, exercise = $3, workoutOrder = $4, resistance = $5, reps = $6, side = $7, notes = $8 WHERE id = $1;'
        query(updateWorkoutSetsQuery, [id, workout, exercise, workoutOrder, resistance, reps, side, notes], (err: Error, result: any) => {
            if (err) {
                callback(err, {success: false, message: 'The the database had a problem updating that workoutSet.'})
                return;
            }
            callback(err, {success: true, message: 'WorkoutSet updated'});
        });
    });
}

export const deleteWorkoutSet = (
    user_id: number,
    workoutSet_id: number,
    callback: (err: Error, rows: any) => void
) => {
    const selectWorkoutSetQuery = 'SELECT id FROM workoutSets WHERE user_id = $1 AND id = $2;'
    query(selectWorkoutSetQuery, [user_id, workoutSet_id], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, {success: false, message: 'You dont have permision do delete that workoutSet.'});
            return; 
        }
        const deleteWorkoutSetsQuery = 'UPDATE workoutSets SET is_deleted = true WHERE id = $1;'
        query(deleteWorkoutSetsQuery, [workoutSet_id], (err: Error, result: any) => {
            if (err) {
                callback(err, {success: false, message: 'The the database had a problem deleting that workoutSet.'})
                return;
            }
            callback(err, {success: true, message: 'WorkoutSet deleted'});
        });
    });
}
