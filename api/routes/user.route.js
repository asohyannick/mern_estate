import express from 'express';
import { updateUser, deleteUser, getUserListings } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();
router.put('/update/:id',verifyToken ,updateUser);
router.get('/listings/:id', verifyToken, getUserListings)
router.delete('/delete/:id',verifyToken ,deleteUser);
export default router;