import { Router } from 'express';

import * as usersJs from '../users/users';

const router = Router();
const { getAllUsers, createUser, getUser, updateUser, deleteUser, loginUser } =
  usersJs.default;

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
router.route('/login').post(loginUser);
router.route('/exerciseAnswer').post();

export default router;
