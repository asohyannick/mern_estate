import Listing from "../models/listing.model.js";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import {errorHandler} from '../utils/error.js'
export const createListing = async(req, res, next) => {
    try {
       const listing = await Listing.create(req.body);
       return res.status(StatusCodes.CREATED).json(listing)
    } catch(error) {
      next(error)   
    }
}

export const deleteListing = async(req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if(!listing) {
    return next(errorHandler(StatusCodes.NOT_FOUND, 'Listing not found!'));
  }
  if(req.user.id !== listing.userRef) {
    return next(errorHandler(StatusCodes.UNAUTHORIZED, 'You can only delete your own listings!'));
  } 
  try {
     await Listing.findByIdAndDelete(req.params.id);
     res.status(StatusCodes.OK).json('Listing has been deleted successfully!');
  } catch(error) {
    next(error);
  }
}