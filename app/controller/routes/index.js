const { log } = require('console');
const express = require('express');
const path = require('path');
const router = express.Router()


router.route('/')
.get((req, res)=>{
    res.render('index', {
        test: "this is the index site",
        logedIn: true
    })
})


module.exports = router;