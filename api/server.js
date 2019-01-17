const express = require("express");
const server = express();
const configureMiddleware = require("../config/middlewareConfig");
const cohortsRouter = require("../routes/cohortsRouter");
const studentsRouter = require("../routes/studentsRouter");

configureMiddleware(server);

// routes
server.use("/cohorts", cohortsRouter);
server.use("/students", studentsRouter);

module.exports = server;
