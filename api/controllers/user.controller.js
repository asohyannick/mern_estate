import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import Listing from "../models/listing.model.js";
const updateUser = async (req, res, next) => {
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
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(StatusCodes.OK).json(rest);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(
        StatusCodes.UNAUTHORIZED,
        "You  can delete only your own account"
      )
    );
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .clearCookie("access_token")
      .status(StatusCodes.OK)
      .json("User has been deleted");
  } catch (error) {
    next(error);
  }
};
const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(StatusCodes.OK).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(
      errorHandler(
        StatusCodes.UNAUTHORIZED,
        "You can only view your own listings!"
      )
    );
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(StatusCodes.NOT_FOUND, "User not found!"));
    }
    const { password: pass, ...rest } = user._doc;
    res.status(StatusCodes.OK).json(rest);
  } catch (error) {
    next(error);
  }
};

export default {
  updateUser,
  deleteUser,
  getUserListings,
  getUser
}