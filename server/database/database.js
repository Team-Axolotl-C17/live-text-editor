const { Pool } = require('pg');
const URL = 'postgres://ilckwhzv:u5dSD12wVZiuSA1HqtHfgka3R58kecHA@drona.db.elephantsql.com:5432/ilckwhzv';
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