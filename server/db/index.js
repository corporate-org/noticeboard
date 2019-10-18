const { Pool } = require('pg');

// Pool automatically uses the following environemntal variables to configure itself:
// PGHOST behaves the same as the host connection parameter.
// PGDATABASE behaves the same as the dbname connection parameter.
// PGUSER behaves the same as the user connection parameter.
// PGPASSWORD behaves the same as the password connection parameter. Use of this environment variable is not recommended for security reasons, as some operating systems allow non-root users to see process environment variables via ps; instead consider using the ~/.pgpass file (see Section 31.14).

//const pool = new Pool();


// If we need to change the variables, we can do that here.
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.DATABASE_PORT,
});

console.log("PGUSER:        " + process.env.PGUSER);
console.log("PGHOST:        " + process.env.PGHOST);
console.log("PGDATABASE:    " + process.env.PGDATABASE);
console.log("DATABASE_PORT: " + process.env.DATABASE_PORT);

module.exports = {
  query: (text, params) => pool
    .query(text, params)
    .catch(e => {
      console.error(`Query failed: ${text}`);
      console.error(e);
      return Promise.reject(e);
    }),
};
