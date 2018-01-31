const mysql = require("mysql");
const pool = mysql.createConnection({
   connectionLimit   :   100,
   host              :   'localhost',
   user              :   'root',
   password          :   '',
   database          :   'messenger',
   debug             :   false
});

pool.connect();

module.exports = pool;