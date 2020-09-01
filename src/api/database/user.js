const bcrypt = require('bcrypt');
const pool = require('./pool.js');
const SALT_ROUNDS = 10;

const createUser = (username, password, callback) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
        if (err) console.log(err);
        const query = `INSERT INTO users(username, password) VALUES ($1, $2);`
        pool.query(query, [username, hash], (err, res) => {
            if (err) console.log(err);
            callback(err, res);
        });
    });
}

const getUsers = (callback) => {
    const query = 'SELECT * FROM users;';
    pool.query(query, null, (err, result) => {
        console.log(result)
        callback(err, result.rows);
    });
}

const login = (username, password, callback) => {
    const query = 'SELECT username, password FROM users WHERE username=$1;';
    pool.query(query, [username], (err, result) => {
        if (err) console.error(err);
        if (result.rows.length === 0) {
            callback({ fatal: false, message: "Username Does Not Exist"})
        }
        console.log(result.rows.length)
        bcrypt.compare(password, result.rows[0].password, (error, result) => {
            if (error) callback(err, null);
            callback(err, result);
        });
        // bcrypt.compare()
    })
}

module.exports = {
    login,
    getUsers,
    createUser,
};