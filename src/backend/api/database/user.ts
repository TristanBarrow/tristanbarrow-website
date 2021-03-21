import bcrypt from 'bcrypt';
import { 
    USER_CREATED, 
    USER_LOGGED_IN,
    USER_ALREADY_EXISTS, 
    USER_PASSWORD_INCORRECT
} from '../../../cradle/messages/genericResponses';
import { query } from './pool';

const SALT_ROUNDS = 10;

export const createUser = (
    username: string, 
    password: string, 
    callback: any
) => {
    // gets all users with username
    const checkUserQuery = 'SELECT * FROM users WHERE username = $1';

    query(checkUserQuery, [username], (checkErr, res) => {
        // if user does not exist go ahead and create the user
        if (res.rows.length === 0){
            // create hash
            bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                if (err) { callback(err, null); return; } // handle salt errors
                
                const insertUserQuery = `INSERT INTO users(username, password, isAdmin) VALUES ($1, $2, $3);`;
                query(insertUserQuery, [username, hash, username === 'TristanBarrow'], (err: Error, res: any) => {
                    if (err) { callback(err, null); return; }
                    callback(err, USER_CREATED);
                });
            });

        
        // tell user the username already exists.
        } else {
            callback(checkErr, USER_ALREADY_EXISTS);
        }
    })

}

export const getUsers = (callback: (err: Error, rows: any) => void) => {
    const selectAllUsersQuery = 'SELECT * FROM users;';
    query(selectAllUsersQuery, null, (err: Error, result: any) => {
        const rows = result.rows.map((row: any) => {
            return {
                id: row.id,
                username: row.username,
                isAdmin: row.isAdmin,
            }
        });
        callback(err, rows);
    });
}

export const login = (
    username: string, 
    password: string, 
    callback: any
) => {

    const selectUserQuery = 'SELECT id, username, password, isadmin FROM users WHERE username = $1;';
    query(selectUserQuery, [username], (err: Error, result: any) => {
        if (result.rows.length === 0) {
            callback(err, { success: false, message: "User Does Not Exist"})
        } else {
            bcrypt.compare(password, result.rows[0].password, (error, passwordIsCorrect) => {
                if (error) callback(error, null);
                if (passwordIsCorrect) {
                    const isAdmin = result.rows[0].isadmin;
                    const user_id = result.rows[0].id;
                    callback(error, {
                        ...USER_LOGGED_IN, 
                        username, 
                        isAdmin,  
                        user_id,
                    });
                } else {
                    callback(error, USER_PASSWORD_INCORRECT);
                }
                
            });
        }
    })
}
