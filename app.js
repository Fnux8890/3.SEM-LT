const express = require('express')
const app = express()
const connectDB = require('./app/db/connect')
const routes = require('./app/controller/routes/users')

const port = 3000

//middleware
app.use(express.json())

//routes
app.use('/api/v1/users', routes)

const start = async () => {
	try {
		await connectDB()
		app.listen(gate, console.log(`server listening at gate ${port}...`))
	} catch (error) {
		console.log(error)
	}
}

start()
