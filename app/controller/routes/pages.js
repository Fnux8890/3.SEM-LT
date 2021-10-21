const express = require("express");
const users = require("../../models/users");
const router = express.Router();
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/login").get((req, res) => {
  res.render("./Login/login");
});

router.route("/createaccount").get((req, res) => {
  res.render("./Login/createaccount");
});

router.route("/user-overview").get((req, res) => {
  res.render("./Login/user-overview");
});

module.exports = router;
