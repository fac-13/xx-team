const dbConnection = require('../database/db_connection.js');

const getAllPosts = (cb) => {
    dbConnection.query(`SELECT users.email, reviews.comment FROM users INNER JOIN reviews ON reviews.user_id=users.id;`, (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res.rows);
        }
    });
};

module.exports = { getAllPosts };