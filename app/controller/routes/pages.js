import { Router } from 'express';
const router = Router();
import { requireAuth } from '../middleware/user-auth';

router.route('/login').get((req, res) => {
	res.render('./Login/login');
});

router.route('/createaccount').get((req, res) => {
	res.render('./Login/createaccount');
});

router.get('/exercise1', requireAuth, (req, res) => {
	res.render('./Exercises/exercise1');
});

router.get('/exercise2', requireAuth, (req, res) => {
	res.render('./Exercises/exercise2');
});

router.get('/exercise3', requireAuth, (req, res) => {
	res.render('./Exercises/exercise3');
});

router.get('/module-overview', requireAuth, (req, res) => {
	res.render('module-overview');
});

router.get('/insert-recording', (req, res) => {
	res.render('insert-recording');
});

router.route('/excersise2').get((req, res) => {
	res.render('./Excersises/exercise2');
});

export default router;
