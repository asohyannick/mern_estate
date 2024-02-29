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