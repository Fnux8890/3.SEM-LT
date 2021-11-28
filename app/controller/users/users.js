import myModel from "../../models/usersModel";

import {
  hash as _hash,
  compare
} from "bcrypt";
import {
  sign
} from "jsonwebtoken";

const getAllUsers = async (req, res) => {
	try {
		const user = await myModel.find({});
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const createUser = async (req, res) => {
	try {
		await myModel
			.find({ username: req.body.username })
			.exec()
			.then((user) => {
				if (user.length >= 1) {
					return res.status(409).json({
						message: "name already exists",
					});
				} else {
					_hash(req.body.password, 10, (err, hash) => {
						if (err) {
							return res.status(500).json({
								error: err,
							});
						} else {
							const newuser = myModel.create({
								username: req.body.username,
								password: hash,
							});
							const token = sign(
								{
									username: newuser.username,
									userID: newuser._id,
								},
								process.env.JWT_KEY,
								{
									expiresIn: "1h",
								}
							);
							res.cookie("jwt", token);
							return res.status(200).json({ message: newuser, token: token });
						}
					});
				}
			});
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const getUser = async (req, res) => {
	try {
		const { id: userID } = req.params;
		const user = await myModel.findOne({ _id: userID });
		if (!user) {
			return res.status(404).json({ msg: `No user with id: ${userID}}` });
		}
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id: userID } = req.params;
		const user = await myModel.findOneAndUpdate({ _id: userID }, req.body, {
			new: true,
			runValidators: true,
		});
		if (!user) {
			return res.status(404).json({ msg: `No user with id: ${userID}}` });
		}
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id: userID } = req.params;
		const user = await myModel.findOneAndDelete({ _id: userID });
		if (!user) {
			return res.status(404).json({ msg: `No user with id: ${userID}}` });
		}
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const loginUser = async (req, res, next) => {
	try {
		myModel
			.find({ username: req.body.username })
			.exec()
			.then((user) => {
				if (user.length < 1) {
					return res.status(401).json({
						message: "Auth failed",
					});
				}
				compare(req.body.password, user[0].password, (err, result) => {
					if (err) {
						return res.status(401).json({
							message: "Auth failed",
						});
					}
					if (result) {
						const token = sign(
							{
								username: user[0].username,
								userID: user[0]._id,
							},
							process.env.JWT_KEY,
							{
								expiresIn: "1h",
							}
						);
						res.cookie("jwt", token);
						return res.status(200).json({
							message: "Auth succesful",
							token: token,
						});
					}
					res.status(401).json({
						message: "Auth failed",
					});
				});
			});
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const postAnswer = async (req, res, next) => {
	try {
		//TODO find ud af hvordan man smider ting op på brugeren som er logget ind
		myModel.findOneAndUpdate({ username: "tester5000" });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

export default {
	getAllUsers,
	createUser,
	getUser,
	updateUser,
	deleteUser,
	loginUser,
};