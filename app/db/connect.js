import { connect } from "mongoose";

const connectDB = () => {
	//const url = 'mongodb://127.0.0.1:27017/Users'
	const url =
		"mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
	(async () => {
		try {
			await connect(url);
			console.log(`MongoDB Connected`);
		} catch (err) {
			console.error(err);
		}
	})();
};

export default connectDB;
