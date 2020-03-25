const { Pool } = require('pg');

const URL =
  'postgres://ldjywrhp:MmkAiRUuTqWcSH2Rj7F-A_G3NbgcGYIx@drona.db.elephantsql.com:5432/ldjywrhp';
const pool = new Pool({ connectionString: URL });

pool.on('connect', () => {
  console.log('Connected to the database');
});

module.exports = {
  query: (query, params, cb) => {
    console.log(`this is the query: ${query}`);
    return pool.query(query, params, cb);
  },
};
