const bcrypt = require('bcrypt');
const pool = require('./pool.js');
const SALT_ROUNDS = 10;

const RESPONSES = {
    USER_CREATED: {success: true, message: 'Your account has been created'},
    USER_ALREADY_EXISTS: {success: false, message: 'Username already exists'},
    USER_LOGGED_IN: {success: true, message: 'Logged In'}
}

// const checkUserExists = () => {

// }


const createUser = (username, password, callback) => {
    // gets all users with username
    const checkUserQuery = 'SELECT * FROM users WHERE username = $1';

    pool.query(checkUserQuery, [username], (checkErr, res) => {
        // if user does not exist go ahead and create the user
        if (res.rows.length === 0){
            // create hash
            bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                if (err) { callback(err, null); return; } // handle salt errors
                
                // insert username and hash into database
                const query = `INSERT INTO users(username, password, isAdmin) VALUES ($1, $2, $3);`;
                pool.query(query, [username, hash, username === 'TristanBarrow'], (err, res) => {
                    if (err) { callback(err, null); return; }
                    callback(err, RESPONSES.USER_CREATED);
                });
            });

        
        // tell user the username already exists.
        } else {
            callback(checkErr, RESPONSES.USER_ALREADY_EXISTS);
        }
    })

}

const getUsers = (callback) => {
    const query = 'SELECT * FROM users;';
    pool.query(query, null, (err, result) => {
        const rows = result.rows.map(row => {
            return {
                id: row.id,
                username: row.username,
                isAdmin: row.isadmin,
            }
        });
        callback(err, rows);
    });
}

const login = (username, password, callback) => {
    const query = 'SELECT username, password, isadmin FROM users WHERE username = $1;';
    pool.query(query, [username], (err, result) => {
        if (result.rows.length === 0) {
            callback(err, { success: false, message: "User Does Not Exist"})
        } else {
            bcrypt.compare(password, result.rows[0].password, (error, passwordIsCorrect) => {
                if (error) callback(error, null);
                if (passwordIsCorrect) {
                    callback(error, {success: true, message: "Logged In", username, isAdmin: result.rows[0].isadmin});
                } else {
                    callback(error, {success: false, message: "Password is incorrect"});
                }
                
            });
        }
    })
}

module.exports = {
    login,
    getUsers,
    createUser,
};