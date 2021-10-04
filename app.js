const express = require("express") 
const app = express()
const connectDB = require("./app/db/connect")
const routes = require("./app/controller/routes/routes")

const gate = 3000;

//middleware
app.use(express.json())

//routes
app.use("/api/v1/tasks",routes)

const start = async () => {
    try {
        await connectDB()
        app.listen(gate, console.log(`server listening at gate ${gate}...`))
    } 
    catch (error) {
        console.log(error)
    }
}

start()