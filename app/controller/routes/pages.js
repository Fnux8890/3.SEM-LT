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
// import {
// 	mongoClient
// } from "mongodb";

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

// Connect using a MongoClient instance
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const fs = require("fs");
const url =
	"mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


router.route("/exercise3").get((req, res) => {
	//var jsonObject = await GetDoc();
	//GetDoc();

	MongoClient.connect(url, function (err, client) {
		assert.equal(null, err);

		const db = client.db("myFirstDatabase");

		let ex3 = "6183ee147a458ab24cd11e51";
		let ex4 = "6183ee047a458ab24cd11e4c";
		let ex1 = "618b8f5c0ffec8dde8060dd4";

		var cursor = db.collection("test").find({
			//fra test collection
			_id: ObjectId(ex1),
		});

		var wordArray;

		function iterateFunc(doc) {
			console.log(JSON.stringify(doc, null, 4));
			wordArray = doc.cards.map((card) => {
				return '"' + card._id + '"';
			});
			console.log("wordarray: " + wordArray);
			res.render("./Exercises/exercise3", doc);
		}

		function errorFunction(err) {
			console.log(err);
		}
		cursor.forEach(iterateFunc, errorFunction);
		//wordObjArr[0].forEach(iterateFunc);

		client.close;
	});


});

export default router;