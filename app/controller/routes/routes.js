const express = require("express")
const {getAllTasks} = require("../tasks/tasks.js")
const router = express.Router()

router.route("/").get((req,res)=> {
    res.send(getAllTasks)
})

module.exports = router
