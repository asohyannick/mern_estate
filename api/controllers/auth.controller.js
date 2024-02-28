import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPaasword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPaasword });
  try {
    await newUser.save();
    res.status(StatusCodes.CREATED).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(StatusCodes.NOT_FOUND, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(StatusCodes.UNAUTHORIZED, "Wrong credentials"));
    }
    const token = jwt
      .sign({ id: validUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      })
      const {password: pass , ...rest} = validUser._doc;
      res.cookie("access_token", token, { httpOnly: true })
      .status(StatusCodes.OK)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
