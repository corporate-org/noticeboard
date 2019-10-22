const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const noticesRouter = require("./routes/notices");
const statsRouter = require("./routes/stats");

const app = express();


app.use(logger("dev"));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/notices", noticesRouter);
app.use("/stats", statsRouter);

app.use("/", express.static("public"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  console.log(err);

  // set locals, only providing error in development
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
