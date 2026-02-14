const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3307,            // since you changed MySQL to port 3307
  user: 'root',
  password: '', // use the password you set/reset
  database: 'mental_health',
});

module.exports = pool;
