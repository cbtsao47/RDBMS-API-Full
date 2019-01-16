const express = require("express");
const route = express.Router();
const statusCode = require("../common/errCodes");
const studentsDb = require("../data/dbConfig");

route.get("/", async (req, res) => {
  try {
    const result = await studentsDb("students");
    res.status(statusCode.ok).json(result);
  } catch (err) {
    res.status(statusCode.internalErr).json({ err });
  }
});

module.exports = route;
