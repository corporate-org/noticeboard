const Router = require("express-promise-router");
const stats = require("../stats");

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

router.get("/numcharacters", async (req, res) => {
  const numCharacters = await stats.get("numcharacters");
  if (!numCharacters) {
    res.status(200).json(0);
  }
  else {
    res.status(200).json(numCharacters);
  }
});

module.exports = router;
