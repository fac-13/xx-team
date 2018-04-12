const dbConnection = require('../database/db_connection.js');
const bcrypt = require('bcryptjs');




const signup = (email, password, cb) => {
       bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                cb(err);
            } else {
                bcrypt.hash(password, salt, (err,hash)=> {
                   if(err){
                       cb(err)
                   }else{
                        console.log('talking from just b4 insert', email, password, hash);
                        dbConnection.query(`INSERT INTO users (email, encrypted_password) VALUES ($1, $2);`, [email, hash], (err, res) => {
                            if (err) {
                                cb(err);
                            } else {
                                cb(null, res.rowCount); //redirect to log in
                            }
                        });
                   }
               });
            }
        });



}

module.exports={ signup };