const express = require("express");
const route = express.Router();
const errCodes = require("../common/errCodes");

route.get("/", (req, res) => {
  try {
    res.send("works");
  } catch (err) {
    res.status(errCodes.internalErr).json({ err });
  }
});

module.exports = route;
