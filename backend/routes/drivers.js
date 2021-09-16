var express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var router = express.Router();
const { query, validationResult } = require("express-validator");

/* GET list of drivers. */
router.get(
  "/",
  query("latitude").exists().withMessage("latitude is required"),
  query("longitude").exists().withMessage("longitude is required"),
  query("count").optional().isNumeric().withMessage("count must be a number"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    fetch(
      `https://qa-interview-test.splytech.dev/api/drivers?latitude=${
        req.query.latitude
      }&longitude=${req.query.longitude}${
        req.query.count ? `&count=${req.query.count}` : ""
      }`
    )
      .then((res) => res.json())
      .then((drivers) => res.json(drivers));
  }
);

module.exports = router;
