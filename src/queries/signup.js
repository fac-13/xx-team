const dbConnection = require('../database/db_connection.js');
const bcrypt = require('bcryptjs');

const signup = (email, password, cb) => {
    const hashPassword = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                callback(err);
            } else {
                bcrypt.hash(password, salt, callback);
            }
        });
    };
    console.log(hashPassword);

}