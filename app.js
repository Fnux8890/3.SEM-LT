const express = require('express')
const app = express()
const connectDB = require('./app/db/connect')
const path = require('path')

const port = 3000

//Load view enigne
app.set('views',path.join(__dirname,"app",'views'))
app.set('view engine', 'pug')

//middleware
app.use(express.json())

//routes
let users = require('./app/controller/routes/users')
let index = require('./app/controller/routes/index')

app.use('/api/v1/users', users)
app.use('/', index)

const start = async () => {
	try {
        //TODO man burde ikke connecte til databasen med det samme
		//connectDB()
		app.listen(port, console.log(`server listening at: http://localhost:${port}`))
	} catch (error) {
		console.log(error.message)
	}
}

start()
