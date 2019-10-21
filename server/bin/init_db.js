const db = require('../db');

console.log(`PGUSER="${process.env.PGUSER}"`);
console.log(`PGDATABASE="${process.env.PGDATABASE}"`);
console.log(`PGHOST="${process.env.PGHOST}"`);
console.log(`DATABASE_PORT="${process.env.DATABASE_PORT}"`);

async function createDb  () {
  await db.query(`SET timezone = 'utc'`);
  await db.query(`CREATE TABLE IF NOT EXISTS notices (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    content     TEXT NULL,
    created_at  TIMESTAMP`);
}

try {
  createDb();
} catch(error) {
  console.error(error);
}
