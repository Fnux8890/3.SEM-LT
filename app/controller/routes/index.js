const { log } = require('console');
const express = require('express');
const path = require('path');
const router = express.Router()
//Eksempel på hente class + lave instance:
//let {Exercise} = require("../../BackEnd/ExerciseModule");
//let test = new Exercise(12, 23, 32, 23, 234);
//console.log(test);

router.route('/')
.get((req, res)=>{
    res.render('index')
})


module.exports = router;