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
import fs from "fs";

//const declare
const port = process.env.PORT || 3000;
const app = express();

//Load view enigne

const directoryPath = join(__dirname, "views", "pages");
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
	//handling error
	if (err) {
		return console.log("Unable to scan directory: " + err);
	}
	//listing all files using forEach
	files.forEach(function (file) {
		// Do whatever you want to do with the file
		console.log(file);
	});
});

app.set("views", join(__dirname, "views", "pages"));
app.set("view engine", "pug");

//middleware
app.options("*", cors());
app.use(express.static(join(__dirname, "views")));
app.use("scripts/", express.static("/node_modules/"));
app.use(express.json()); //Kan se JSON payloads fra front-end
app.use(express.urlencoded({ extended: false })); //Kan se String/text payloads fra front-end
//app.use("/page/*", insertNavbar);
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
			port,
			console.log(`server listening at: http://localhost:${port}`)
		);
	} catch (error) {
		console.log(error.message);
	}
};
start();
