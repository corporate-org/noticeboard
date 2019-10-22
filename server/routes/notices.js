const Router = require("express-promise-router");
const db = require("../db");
const stats = require("../stats");

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

function toNotice(row) {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    postedTime: row.created_at
  };
}

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT id, title, content, created_at FROM notices");
  res.json(rows.map(toNotice));
});

router.get("/:id", async (req, res) => {
  const { rows } = await db.query("SELECT id, title, content, created_at FROM notices WHERE id = $1", [req.params.id]);
  if (0 === rows.length) {
    res.status(404).send(`Notice "${req.params.id}" not found.`);
  }
  else {
    res.json(toNotice(rows[0]));
  }
});

router.post("/", async (req, res) => {
  const { rows } = await db.query(`
INSERT INTO notices (title, content, created_at)
VALUES ($1, $2, $3)
RETURNING id`
  , [req.body.title, req.body.content, new Date()]);

  await stats.increment("numcharacters", req.body.content.length);

  res.json(rows[0].id);
});

module.exports = router;
