const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// console.log("Connection String: ", process.env.DATABASE_URL);

// console.log(pool.query("SELECT * from users;", null, (err, result) => {
//     console.log(result);
// }))

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}