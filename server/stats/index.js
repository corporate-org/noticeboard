const redis = require("redis");
const {promisify} = require("util");

const redisClient = redis.createClient(process.env.REDISPORT || 6379, process.env.REDISHOST);
redisClient.on("error", err => console.error("ERR:REDIS:", err));


module.exports = {
  increment: promisify(redisClient.incrby).bind(redisClient),
  get: promisify(redisClient.get).bind(redisClient),
};
