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

router.route("/excersise1").get((req, res) => {
	res.render("./Excersises/excersise1");
});

export default router;
