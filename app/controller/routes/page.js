const express = require("express");
const router = express.Router();

router.route("/login").get((req, res) => {
  res.render("login");
});

router.use("/", require("./index"));

module.exports = router;
