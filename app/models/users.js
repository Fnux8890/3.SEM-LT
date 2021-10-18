const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'must provide a name'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'must provide a password'],
	},
	set1: [
		{
			exercise1: {
				type: Boolean,
				default: false,
			},
			exercise2: {
				type: Boolean,
				default: false,
			},
			exercise3: {
				type: Boolean,
				default: false,
			},
			test: {
				type: Boolean,
				default: false,
			},
		},
	],
})

module.exports = mongoose.model('User', UserSchema)
