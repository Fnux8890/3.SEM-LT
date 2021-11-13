import { Router } from "express";
const router = Router();

import users from "../../models/usersModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { default as userJS } from "../users/users.js";
const { getAllUsers, createUser, getUser, updateUser, deleteUser, loginUser } =
	userJS;

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/login").post(loginUser);

export default router;
