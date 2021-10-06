const mongoose = require('mongoose')

const connectDB = () => {
	const url = 'mongodb://127.0.0.1:27017/Users'
	;(async () => {
		try {
			await mongoose.connect(url)
			console.log(`MongoDB Connected: ${url}`)
		} catch (err) {
			console.error(err)
		}
	})()
}

module.exports = connectDB
