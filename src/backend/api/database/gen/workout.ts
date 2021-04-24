import { user } from '../../endpoints/user';
import { query } from '../pool';

type DbWorkoutRow = {
    id: number
    workout_type: string
    date: string
    description: string
    is_deleted: boolean
    user_id: number
}

type WorkoutRow = {
    id: number
    workout_type: string
    date: string
    description: string 
}

type CreateWorkout = {
    workout_type: string
    date: string
    description: string
}

export const createWorkout = (
    user_id: number,
    workout: CreateWorkout,
    callback: (err: Error, rows: any) => void
) => {
    const { workout_type, date, description } = workout;
    const insertWorkoutQuery = 'INSERT INTO workouts(workout_type, date, description, is_deleted, user_id) VALUES ($1, $2, $3, false, $4);';
    query(insertWorkoutQuery, [workout_type, date, description, user_id], (err: Error, res: any) => {
        if (err) {
            callback(err, null);
        }
        callback(err, { success: true, message: 'Created Workout' });
    });
}

export const readWorkouts = (
    user_id: number,
    getDeleted: boolean,
    callback: (err: Error, rows: any) => void
) => {
    const selectAllWorkoutsQuery = 'SELECT id, workout_type, date, description, is_deleted FROM workouts WHERE user_id = $1;';
    query(selectAllWorkoutsQuery, [user_id], (err: Error, result: any) => {
        let rows: WorkoutRow[] = [];
        result.rows.forEach((row: DbWorkoutRow): void => {
            if (getDeleted || !row.is_deleted) {
                rows.push({
                    id: row.id,
                    workout_type: row.workout_type,
                    date: row.date,
                    description: row.description,
                });
            } 
        });
        callback(err, rows);
    });
}

export const updateWorkout = (
    user_id: number, 
    workout: WorkoutRow,
    callback: (err: Error, rows: any) => void
) => {
    const { id, workout_type, date, description } = workout;
    const selectWorkoutQuery = 'SELECT id FROM workouts WHERE user_id = $1 AND id = $2;'
    query(selectWorkoutQuery, [user_id, id], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, {success: false, message: 'You dont have permision do update that workout.'});
            return; 
        }
        const updateWorkoutsQuery = 'UPDATE workouts SET workout_type = $2, date = $3, description = $4 WHERE id = $1;'
        query(updateWorkoutsQuery, [id, workout_type, date, description], (err: Error, result: any) => {
            if (err) {
                callback(err, {success: false, message: 'The the database had a problem updating that workout.'})
                return;
            }
            callback(err, {success: true, message: 'Workout updated'});
        });
    });
}

export const deleteWorkout = (
    user_id: number,
    workout_id: number,
    callback: (err: Error, rows: any) => void
) => {
    const selectWorkoutQuery = 'SELECT id FROM workouts WHERE user_id = $1 AND id = $2;'
    query(selectWorkoutQuery, [user_id, workout_id], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, {success: false, message: 'You dont have permision do delete that workout.'});
            return; 
        }
        const deleteWorkoutsQuery = 'UPDATE workouts SET is_deleted = true WHERE id = $1;'
        query(deleteWorkoutsQuery, [workout_id], (err: Error, result: any) => {
            if (err) {
                callback(err, {success: false, message: 'The the database had a problem deleting that workout.'})
                return;
            }
            callback(err, {success: true, message: 'Workout deleted'});
        });
    });
}
