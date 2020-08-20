const bcrypt = require('bcrypt');
const pool = require('./pool.js');
const SALT_ROUNDS = 10;

// const addUser = (username, password) => {
//     bcrypt.hash(password, SALT_ROUNDS, () => {
//         const q = 'SELECT u' 
//         pool.query()
//     })
// }

const getUsers = (callback) => {
    const query = 'SELECT username FROM users';
    pool.query(query, (err, result) => {
        callback(err, result.rows);
    });
}

module.exports = {
    getUsers
};