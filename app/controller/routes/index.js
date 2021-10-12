const { log } = require("console");
const express = require("express");
const path = require("path");
const router = express.Router();
let logedIn = false;

router.route("/").get((req, res) => {
  res.render("index", {
    logedIn: logedIn,
  });
  res.end();
});

router.get("/index", (req, res) => {
  res.render("", {
    logedIn: logedIn,
  });
  res.end();
});

router.post("/login", (req, res) => {
  logedIn = !logedIn;
  res.end();
});

module.exports = router;
