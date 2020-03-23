const { Pool } = require('pg');
const URL = 'postgres://kenhgyvo:tmusXooNdnmQ35ja1k8ILimiD5oIj0yn@drona.db.elephantsql.com:5432/kenhgyvo';
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