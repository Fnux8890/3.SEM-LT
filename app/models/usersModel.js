import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
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

const myModel = model('User', UserSchema)

export default myModel
