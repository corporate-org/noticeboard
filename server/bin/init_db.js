const db = require('../db');

console.log("[init_db.js] Initializing database");
console.log(`[init_db.js] PGUSER="${process.env.PGUSER}"`);
console.log(`[init_db.js] PGHOST="${process.env.PGHOST}"`);
console.log(`[init_db.js] PGDATABASE="${process.env.PGDATABASE}"`);,
console.log(`[init_db.js] DATABASE_PORT="${process.env.DATABASE_PORT}"`);

async function createDb  () {
  await db.query(`SET timezone = 'utc'`);
  await db.query(`CREATE TABLE IF NOT EXISTS notices (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    content     TEXT NULL,
    created_at  TIMESTAMP)`);
}

try {
  createDb();
} catch(error) {
  console.error(error);
}
console.log("[init_db.js] Initializing complete.");
