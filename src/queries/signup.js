const dbConnection = require('../database/db_connection.js');
const bcrypt = require('bcryptjs');

const signup = (email, password, cb) => {
    console.log('talking from sign up', email, password);
    
       bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                cb(err);
            } else {
               bcrypt.hash(password, salt, (err,hash)=> {
                   if(err){
                       console.log(err)
                   }else{
                        dbConnection.query(`INSERT INTO users (email, encrypted_password) VALUES (${email}, ${hash});`, (err, res) => {
                            if (err) {
                                cb(err);
                            } else {
                                cb(null, res.rows);
                            }
                        });
                   }
               });
            }
        });



}

module.exports={ signup };