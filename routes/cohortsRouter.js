const express = require("express");
const route = express.Router();
const statusCode = require("../common/errCodes");
const db = require("../data/dbConfig");
const nameCheck = require("../common/nameCheck");

function failed(err, res) {
  res
    .status(statusCode.internalErr)
    .json({ message: "There is something wrong with the server." });
}

route.get("/", async (req, res) => {
  try {
    const result = await db("cohorts");
    res.status(statusCode.ok).json(result);
  } catch (err) {
    res
      .status(statusCode.internalErr)
      .json({ message: "There is something wrong with the server." });
  }
});
route.get("/:id/students", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("students").where({ cohort_id: id });
    if (result.length) {
      res.status(statusCode.ok).json(result);
    }
    res.status(statusCode.notFound).json({ message: "Not Found" });
  } catch (err) {
    failed(res);
  }
});
route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("cohorts").where({ id });
    if (result.length) {
      res.status(statusCode.ok).json(result[0]);
    }
    res.status(statusCode.notFound).json({ message: "Not Found" });
  } catch (err) {
    failed(res);
  }
});

route.post("/", nameCheck, async (req, res) => {
  const info = req.body;
  try {
    await db("cohorts").insert(info);
    res.status(statusCode.created).json({ message: "Cohort created!" });
  } catch (err) {
    failed(res);
  }
});

route.put("/:id", nameCheck, async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  try {
    const result = await db("cohorts").where({ id });
    if (result.length) {
      await db("cohorts")
        .where({ id })
        .update(change);
      res
        .status(statusCode.accepted)
        .json({ message: "Student has been updated" });
    } else {
      res.status(statusCode.notFound).json({ message: "Cohort not found" });
    }
  } catch (err) {
    failed(res);
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("cohorts").where({ id });
    if (result.length) {
      await db("cohorts")
        .where({ id })
        .del();
      res
        .status(statusCode.accepted)
        .json({ message: "Cohort has been deleted" });
    } else {
      res.status(statusCode.notFound).json({ message: "Cohort not found" });
    }
  } catch (err) {
    failed(res);
  }
});

module.exports = route;
