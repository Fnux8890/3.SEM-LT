import {
	Router
} from "express";
const router = Router();

//
import express from "express";
import connectDB from "../../db/connect";
import {
	ObjectId
} from "mongodb";
import {
	checkPrimeSync
} from "crypto";
import {
	mongoClient
} from "mongodb";

router.route("/login").get((req, res) => {
	res.render("./Login/login");
});

router.route("/createaccount").get((req, res) => {
	res.render("./Login/createaccount");
});

router.route("/user-overview").get((req, res) => {
	res.render("./Login/user-overview");
});

router.route("/exercise1").get((req, res) => {
	res.render("./Exercises/exercise1");
});

router.route("/index").get((req, res) => {
	res.render("./index");
});

router.route("/exercise3").get((req, res) => {
	res.render("./Exercises/exercise3");
});

export default router;