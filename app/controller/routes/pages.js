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


// var GetDocument = function (collection, field, value) {
// 	// 	const url = 'mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// 	// 	console.log("getdocument()")
// 	// 	MongoClient.connect(url, function (err, client) {
// 	// 		assert.equal(null, err);
// 	// 		console.log("MongoClient");
// 	// 		const db = client.db("myFirstDatabase");

// 	// 		function iterateFunc(doc) {
// 	// 			console.log("iterateFunc");
// 	// 			console.log(JSON.stringify(doc, null, 4));

// 	// 			fs.writeFile("output43.json", JSON.stringify(doc), function (err) {
// 	// 				if (err) {
// 	// 					console.log("An error occured while writing JSON Object to File.");
// 	// 					return console.log(err);
// 	// 				}
// 	// 				console.log("JSON file has been saved.");
// 	// 			});
// 	// 		}

// 	// 		function errorFunction(err) {
// 	// 			console.log(err);
// 	// 		}

// 	// 		var cursor = db.collection(collection).find({
// 	// 			field: value
// 	// 		});

// 	// 		cursor.forEach(iterateFunc, errorFunction);

// 	// 		console.log("almost done");

// 	// 		//return jsonObject;

// 	// 		client.close;

// 	// 	});
// };

// router.route("/setUpExercise/").post((req, res) => {

// });

// const GetDoc = async (req, res) => {
// 	const url = 'mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// 	var jsonObject;
// 	await MongoClient.connect(url, async function (err, client) {
// 		assert.equal(null, err);

// 		const db = client.db("myFirstDatabase");
// 		let ex3 = "6183ee147a458ab24cd11e51"
// 		let ex4 = "6183ee047a458ab24cd11e4c"

// 		var cursor = db.collection('test').find({ //fra test collection
// 			_id: ObjectId(ex4)
// 		});


// 		function iterateFunc(doc) {
// 			console.log(JSON.stringify(doc, null, 4));

// 			fs.writeFileSync("output43.json", JSON.stringify(doc, null, 4), function (err) {
// 				if (err) {
// 					console.log("An error occured while writing JSON Object to File.");
// 					return console.log(err);
// 				}
// 				console.log("JSON file has been saved.");
// 			});
// 		}

// 		function errorFunction(err) {
// 			console.log(err);
// 		}

// 		await cursor.forEach(iterateFunc, errorFunction);

// 		//var jsonObject = await JSON.parse(fs.readFileSync("./output43.json"));
// 		//jsonObject = await JSON.tryParse(fs.readFileSync("./output43.json"))

// 		try {
// 			jsonObject = await JSON.parse(fs.readFileSync("./output43.json"));
// 		} catch (error) {
// 			console.log(error);
// 		}

// 		let wordArray = jsonObject.cards.map((card) => {
// 			return card.wordId;
// 		});


// 		console.log("word ids: " + JSON.stringify(wordArray));

// 		client.close;
// 	});

// 	return jsonObject;
// }
// const rend = function (data, res) {
// 	res.render(data);
// }



router.route('/anwOpts').post((req, res) => {
	let ansOpt = JSON.parse(req.body.answerOptions);
	console.log("SERVER: " + ansOpt);
	res.render('./Excersises/exercise3', ansOpt);
})

// Connect using a MongoClient instance
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const fs = require('fs');
const url = 'mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


router.route('/ex3').get((req, res) => {
	MongoClient.connect(url, function (err, client) {
		assert.equal(null, err);

		const db = client.db("myFirstDatabase");

		let ex3 = "6183ee147a458ab24cd11e51"
		let ex4 = "6183ee047a458ab24cd11e4c"
		let ex1 = "618b8f5c0ffec8dde8060dd4"

		var cursor = db.collection('test').find({ //fra test collection
			_id: ObjectId(ex1)
		});

		function iterateFunc(doc) {
			//console.log(JSON.stringify(doc, null, 4));
			console.log("getting object for client: ");
			res.setHeader("Content-Type", "application/json");
			res.send(JSON.stringify(doc));
		}

		function errorFunction(err) {
			console.log(err);
		}
		cursor.forEach(iterateFunc, errorFunction)
		//wordObjArr[0].forEach(iterateFunc);

		client.close;
	});
})

router.route("/exercise3").get((req, res) => {

	//var jsonObject = await GetDoc();
	//GetDoc();

	MongoClient.connect(url, function (err, client) {
		assert.equal(null, err);

		const db = client.db("myFirstDatabase");

		let ex3 = "6183ee147a458ab24cd11e51"
		let ex4 = "6183ee047a458ab24cd11e4c"
		let ex1 = "618b8f5c0ffec8dde8060dd4"

		var cursor = db.collection('test').find({ //fra test collection
			_id: ObjectId(ex1)
		});
		//console.log(JSON.stringify(cursor));
		var wordArray;

		function iterateFunc(doc) {
			console.log(JSON.stringify(doc, null, 4));
			wordArray = doc.cards.map((card) => {
				//return ObjectId(`"${card._id}"`);
				return '"' + card._id + '"'
			});
			console.log("wordarray: " + wordArray);

			//res.render('./Excersises/exercise3', doc);
			//res.send(JSON.stringify(doc));
			res.render('./Excersises/exercise3', doc);
		}

		function errorFunction(err) {
			console.log(err);
		}
		cursor.forEach(iterateFunc, errorFunction)
		//wordObjArr[0].forEach(iterateFunc);

		client.close;
	});

	// let wordArray = jsonObject.cards.map((card) => {
	// 	return card.wordId;
	// });

	// fs.writeFileSync("output43.json", JSON.stringify(doc, null, 4), function (err) {
	// 	if (err) {
	// 		console.log("An error occured while writing JSON Object to File.");
	// 		return console.log(err);
	// 	}
	// 	console.log("JSON file has been saved.");
	// });

	// console.log(JSON.stringify(jsonObject));

	//let tex = jsonObject.exercises[0];
	//console.log("exercise id: " + JSON.stringify(tex));

	//let jsonObject = JSON.parse(fs.readFileSync("./output43.json"));

	//console.log("BEFORE WE RENDER: " + JSON.stringify(jsonObject, null, 4));



	//console.log("word ids: " + JSON.stringify(wordArray));

	//    res.render('./Excersises/exercise3', jsonObject);

	//res.setHeader('Content-Type', 'application/json');
	//res.send(jsonObject);



	//res.send(jsonObject)
	//res.render('./Excersises/exercise3', JSON.parse(jsonObject));

	// res.render('./Excersises/exercise3', {
	// 	answer1: "thisIsTest"
	// });
});

export default router;