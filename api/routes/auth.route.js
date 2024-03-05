import  express from 'express';
import auth from '../controllers/auth.controller.js';
const router = express.Router();
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.post('/google', auth.google);
router.delete('/signout', auth.signout);
export default router;