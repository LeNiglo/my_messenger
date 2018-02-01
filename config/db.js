const mysql = require("mysql");
const pool = mysql.createConnection({
   connectionLimit   :   100,
   host              :   'localhost',
   user              :   'root',
   password          :   '',
   database          :   'messenger',
   debug             :   false
});

pool.connect(function(err) {
    if (err) throw err;
  		console.log("Connected!");  
});

module.exports = pool;