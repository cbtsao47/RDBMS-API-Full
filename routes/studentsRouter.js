const express = require("express");
const route = express.Router();
const statusCode = require("../common/errCodes");
const nameCheck = require("../common/nameCheck");
const db = require("../data/dbConfig");

function failed(res) {
  res
    .status(statusCode.internalErr)
    .json({ message: "There is something wrong with the server." });
}

route.get("/", async (req, res) => {
  try {
    const result = await db("students");
    res.status(statusCode.ok).json(result);
  } catch (err) {
    failed(res);
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("students")
      .join("cohorts", "students.cohort_id", "cohorts.id")
      .select("students.id", "students.name", { cohort: "cohorts.name" })
      .where({ "students.id": id });
    if (result.length) {
      res.status(statusCode.ok).json(result[0]);
    } else {
      res.status(statusCode.notFound).json({ message: "Not Found" });
    }
  } catch (err) {
    failed(res);
  }
});

route.post("/", nameCheck, async (req, res) => {
  const info = req.body;
  try {
    const result = await db("cohorts").where({ id: info.cohort_id });
    if (!result.length) {
      await db("students").insert(info);
      res.status(statusCode.created).json({ message: "Student created!" });
    }
  } catch (err) {
    failed(res);
  }
});

route.put("/:id", nameCheck, async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  try {
    const result = await db("students").where({ id });
    if (result.length) {
      await db("students")
        .where({ id })
        .update(change);
      res
        .status(statusCode.accepted)
        .json({ message: "Student has been updated" });
    } else {
      res.status(statusCode.notFound).json({ message: "Student not found" });
    }
  } catch (err) {
    failed(res);
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("students").where({ id });
    if (result.length) {
      await db("students")
        .where({ id })
        .del();
      res
        .status(statusCode.accepted)
        .json({ message: "Student has been deleted" });
    } else {
      res.status(statusCode.notFound).json({ message: "Student not found" });
    }
  } catch (err) {
    failed(res);
  }
});

module.exports = route;
