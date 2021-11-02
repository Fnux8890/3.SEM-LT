import { Router } from "express";
import mongoose from "mongoose";
import setModel from "../../models/set";
import exercisesModel from "../../models/exercises";
import wordModel from "../../models/words";
const router = Router();
const fs = require("fs");
const async = require("async");

router.route("/Exercise").get(async (req, res) => {
    //let id = req.params.id;
    const exerciseID = await setModel.find({"name": "Set 1"});

    function iterateFunc(data) {
        fs.writeFile("Output.json", JSON.stringify(data), function (err) {
            if(err) {
                console.log("Error");
                return console.log(err);
            } else {
                console.log("Saved data");
            }
        })
    }

    function errFunc(err) {
        console.log(err);
    }

    exerciseID.forEach(iterateFunc, errFunc);

    let exerciseByIndex = JSON.parse(fs.readFileSync("./Output.json"));
    //Finder det første id af exercises arrayet
    let firstExercise = exerciseByIndex.exercises[0];

    //Finder Exercise ud fra det ID vi finder i "set"
    const exactExercise = await exercisesModel.find({"_id": `${firstExercise}`});

    /*fs.unlinkSync("./Output.json", () => {
        console.log("done");
    });*/

    //Kører igennem det data vi finder lige over her og gemmer det i en JSON
    exactExercise.forEach(iterateFunc, errFunc);
    //Læser JSON dokumentet der lige er blevet gemt, så man længere nede kan sende det videre
    let exerciseTheOne = JSON.parse(fs.readFileSync("./Output.json"));


    res.send(JSON.stringify(exactExercise));
    //console.log(JSON.stringify());

    /*async.series([
        (callback) => {
            console.log('This is the first function');

            const exerciseID = setModel.find({"name": "Set 1"});
            exerciseID.forEach(iterateFunc(), errFunc);
            let exerciseByIndex = JSON.parse(fs.readFileSync("./Output.json"));
            let firstExercise = exerciseByIndex.exercises[0];
            fs.unlinkSync("./Output.json", () => {
                console.log("done");
            })

            callback(null, firstExercise);
        },
        (firstExercise, callback) => {
            console.log('This is the second function');
            var exactExercise = exercisesModel.find({"_id": `${firstExercise}`});
            exactExercise.forEach(iterateFunc(), errFunc);
            let exerciseTheOne = JSON.parse(fs.readFileSync("./Output.json"));
            display = res.send(JSON.stringify(exerciseTheOne));

            callback(null, display);
        }
    ], (err, result) => {
        if (err) console.error(err);
        console.log(result);
    });*/

})

export default router