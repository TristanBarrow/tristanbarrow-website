const pool = require('./pool.js');

const getBookmarks = (user, callback) => {
    // const query = 'SELECT bookmark FROM users_bookmarks WHERE "user" = (SELECT id FROM users WHERE username = $1)';
    // //'SELECT id FROM users WHERE username = $1;';

    // pool.query(query, [user], (err, res) => {
    //     if (err) console.log(err);
    //     callback(err, res);
    //     console.log(res);
    // });
}

const addBookmark = () => {
    // const query = 'INSERT INTO bookmarks(bookmark) VALUES (\'mark\');'
    

}

const getBookmark = (bookmark, callback) => {
    const insert = 'INSERT INTO bookmarks(bookmark) VALUES (\'mark\');'
    const query = 'SELECT * FROM bookmarks;';
    pool.query(insert, (err, response) => {
        if (err) console.error(err);
        console.log(response);
        callback(err, response);
    })
}

const getAllBookmarks = (callback) => {
    const query = 'SELECT * FROM bookmarks;';
    pool.query(query, (err, response) => {
        if (err) console.error(err);
        console.log(response);
        callback(err, response.rows);
    })
}

module.exports = {
    getBookmarks,
    getBookmark,
    addBookmark,
}