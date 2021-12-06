import { Schema, model } from 'mongoose';

const module = new Schema(
	{
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		sets: {
			type: Array,
		},
	},
	{ collection: 'modules' }
);

const moduleModel = model('modules', module);

export default moduleModel;
