const { Pool } = require('pg');
const URL = 'postgres://hmuksvml:cqxYSf0ghR3syqw9x42JLZK0sqG_jc2_@drona.db.elephantsql.com:5432/hmuksvml';
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