import { Router } from "express";
const router = Router();

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

export default router;
