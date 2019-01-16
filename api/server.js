const express = require("express");
const server = express();
const configureMiddleware = require("../config/middlewareConfig");

configureMiddleware(server);

// routes
// server.use("/cohorts");
// server.use("/students");

server.get("/", (req, res) => {
  try {
    res.send("sanity check");
  } catch (err) {
    res.json(err);
  }
});
module.exports = server;
