import { Router } from "express";
const router = Router();

import { default as userJS } from "../users/users.js";
const { getAllUsers, createUser, getUser, updateUser, deleteUser, loginUser } =
	userJS;

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/login").post(loginUser);
router.route("/exerciseAnswer").post();

export default router;
