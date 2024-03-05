import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import user from '../controllers/user.controller.js';
const router = express.Router();
router.put('/update/:id',verifyToken ,user.updateUser);
router.get('/listings/:id', verifyToken, user.getUserListings)
router.delete('/delete/:id',verifyToken ,user.deleteUser);
router.get('/:id', verifyToken, user.getUser);
export default router;