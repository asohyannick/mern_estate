import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(
        StatusCodes.UNAUTHORIZED,
        "You can only update your  own account"
      )
    );
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true });
    const { password, ...rest } = updatedUser._doc;
    res.status(StatusCodes.OK).json(rest);
  } catch (error) {
    next(error);
  }
};
