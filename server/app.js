import express from "express";
import connectDB from "./app/db/connect";
import { join } from "path";
import cors from "cors";
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// custom middlewares
import { insertNavbar } from "@middleware/insertNavbar";
// import routes
import userRoutes from "./app/controller/routes/users";
import pageRoutes from "./app/controller/routes/pages";
import buildRoute from "./app/controller/routes/buildRoute";

//const declare
const port = 3000;
const app = express();

//Load view enigne
app.set("views", join(__dirname, "app", "views", "pages"));
app.set("view engine", "pug");

//middleware
app.options("*", cors());
app.use(express.static(join(__dirname, "app", "views")));
app.use("scripts/", express.static("/node_modules/"));
app.use(express.json()); //Kan se JSON payloads fra front-end
app.use(express.urlencoded({ extended: false })); //Kan se String/text payloads fra front-end
app.use("/page/*", insertNavbar);
app.use(cookieParser());
app.use(fileUpload());

//routes
app.get("/", (req, res) => {
	res.redirect("/page/login");
	res.end();
});
app.use("/api/v1/users", userRoutes);
app.use("/page", pageRoutes);
app.use("/build", buildRoute);

//error handler
app.use((err, req, res, next) => {
	console.log("Stack: " + err.stack);
	console.log("Message: " + err.message);
	console.log("Status: " + err.status);
	res.status(err.status || 500);

	res.render("error", {
		errorCode: err.status,
		errorMessage: err.message,
	});
});

//server setup
const start = () => {
	try {
		connectDB();
		app.listen(
			process.env.PORT || 3000,
			console.log(`server listening at: http://localhost:${port}`)
		);
	} catch (error) {
		console.log(error.message);
	}
};
start();
