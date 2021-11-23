import mongoose, { Schema, model } from "mongoose";

const exercise = new Schema(
	{
		id: mongoose.Types.ObjectId,
		name: String,
		description: String,
		instructions: Array,
	},
	{ collection: "exercises" }
);

const exerciseModel = model("exercises", exercise);

export default exerciseModel;
