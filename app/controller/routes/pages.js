import { Router } from 'express';
const router = Router();
import { requireAuth } from '../middleware/user-auth';

router.route('/login').get((req, res) => {
	res.render('./Login/login');
});

router.route('/createaccount').get((req, res) => {
	res.render('./Login/createaccount');
});

router.get('/user-overview', requireAuth, (req, res) => {
	res.render('./Login/user-overview');
});

router.get('/exercise1', requireAuth, (req, res) => {
	res.render('./Exercises/exercise1');
});

router.get('/exercise2', requireAuth, (req, res) => {
	res.render('./Exercises/exercise1');
});

router.get('/exercise3', requireAuth, (req, res) => {
	res.render('./Exercises/exercise1');
});

router.get('/module-overview', requireAuth, (req, res) => {
	res.render('module-overview');
});

export default router;
