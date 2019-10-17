const db = require('../db');

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
