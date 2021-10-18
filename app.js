const express = require('express')
const app = express()
const connectDB = require('./app/db/connect')
const userRoutes = require('./app/controller/routes/users')
const pageRoutes = require('./app/controller/routes/pages')
const path = require('path')

const port = 3000

//view engine
app.set('views', path.join(__dirname, '/app/views'))
app.set('view engine', 'pug')

//middleware

app.use(express.static('./app/views'))
app.use(express.json()) //Kan se JSON payloads fra front-end
app.use(express.urlencoded({ extended: false })) //Kan se String/text payloads fra front-end

//routes
app.use('/api/v1/users', userRoutes)
app.use('/', pageRoutes)

const start = async () => {
	try {
		await connectDB()
		app.listen(port, console.log(`server listening at port ${port}...`))
	} catch (error) {
		console.log(error)
	}
}

start()
