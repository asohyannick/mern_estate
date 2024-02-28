import User from '../models/user.model.js';
import { StatusCodes } from 'http-status-codes';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
export const signup = async(req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPaasword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPaasword});
    try {
        await newUser.save();
        res.status(StatusCodes.CREATED).json('User created successfully!');
    } catch(error) {
        next(error)
    }
}