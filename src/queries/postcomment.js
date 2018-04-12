const dbConnection = require('../database/db_connection.js');

const postComment = (comment, cb) => {
  dbConnection.query(
    'INSERT INTO reviews(user_id, comment) VALUES ($1, $2);',
    [1, comment],
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
      }
    },
  );
};

module.exports = { postComment };
