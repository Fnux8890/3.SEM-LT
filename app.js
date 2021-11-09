import express from "express";
import connectDB from "./app/db/connect";
import { join } from "path";
import cors from "cors";
// custom middlewares
//import { insertNavbar } from "@middleware/insertNavbar"; **FÅR ERROR SKAL FIXES**
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
//app.use("/page/*", insertNavbar); **FÅR ERROR SKAL FIXES**

//routes
app.use("/api/v1/users", userRoutes);
app.use("/page", pageRoutes);
app.use("/build", buildRoute);

//error handler
app.use((err, req, res, next) => {
	console.log(err.stack);
	console.log(err.message);
	console.log(err.status);
	res.status(err.status || 500);

	res.render("error", {
		errorCode: err.status,
		errorMessage: err.message,
	});
});

//server setup
const start = () => {
	try {
		//TODO man burde ikke connecte til databasen med det samme
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
