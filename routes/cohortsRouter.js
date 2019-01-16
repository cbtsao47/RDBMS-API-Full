const express = require("express");
const route = express.Router();
const statusCode = require("../common/errCodes");
const cohortsDb = require("../data/dbConfig");

route.get("/", async (req, res) => {
  try {
    const result = await cohortsDb("cohorts");
    res.status(statusCode.ok).json(result);
  } catch (err) {
    res.status(statusCode.internalErr).json({ err });
  }
});
module.exports = route;
