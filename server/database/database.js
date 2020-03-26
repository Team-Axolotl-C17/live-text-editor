const { Pool } = require('pg');
const URL = 'postgres://ivbcpiul:ed3nMT5hM91F1NGMLJKHrciFwTzqKYK0@drona.db.elephantsql.com:5432/ivbcpiul';
const pool = new Pool({ connectionString: URL });

pool.on('connect', () => {
  console.log('Connected to the database');
});

module.exports = {
  query: (query, params, cb) => {
    console.log(`this is the query: ${query}`);
    return pool.query(query, params, cb);
  }
}