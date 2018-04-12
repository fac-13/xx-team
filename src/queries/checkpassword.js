const dbConnection = require('../database/db_connection.js');
const bcrypt = require('bcryptjs');



const checkPassword = (email, password, cb) => {
    dbConnection.query(`SELECT encrypted_password FROM users WHERE email = $1`, [email], (err, res) => {
      if (err) {
        cb(err);
      } else {
        console.log('talking from bcrypt', res);
        bcrypt.compare(password, res.rows[0].encrypted_password, (err,res)=>{
            if(err){
                console.log('talking from bcryptcompare as res:', err)
                cb(err);
            }else{
                console.log('talking from bcryptcompare as res:', res)
                cb(null, res);
            }
        });
    }
  });
};
  
  module.exports = { checkPassword };