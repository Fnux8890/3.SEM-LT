const mongoose = require('mongoose')

const connectDB = async () => {
	//const url = 'mongodb://127.0.0.1:27017/Users'
	const url = 'mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
	try {
		await mongoose.connect(url)
		console.log(`MongoDB Connected`)
	} catch (err) {
		console.error(err.message)
	}
}

module.exports = connectDB
