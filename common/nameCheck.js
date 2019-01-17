const statusCode = require("./errCodes");
module.exports = (req, res, next) => {
  console.log(req.body.name.length, "length");
  if (!req.body.name.length) {
    res.status(statusCode.badRequest).json({ message: "Please input a name" });
  } else {
    next();
  }
};
