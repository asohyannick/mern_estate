import Listing from "../models/listing.model.js";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../utils/error.js";

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(StatusCodes.CREATED).json(listing);
  } catch (error) {
    next(error);
  }
};
 const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(StatusCodes.NOT_FOUND, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(
        StatusCodes.UNAUTHORIZED,
        "You can only delete your own listings!"
      )
    );
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json("Listing has been deleted successfully!");
  } catch (error) {
    next(error);
  }
};
 const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(StatusCodes.NOT_FOUND, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(
        StatusCodes.UNAUTHORIZED,
        "You can only update your own listing"
      )
    );
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(StatusCodes.OK).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
 const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(StatusCodes.NOT_FOUND, "Listing not found"));
    }
    res.status(StatusCodes.OK).json(listing);
  } catch (error) {
    next(error);
  }
};

const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    
    }
    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";
    
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(StatusCodes.OK).json(listings);
  } catch (error) {
    next(error);
  }
};
export default {
  createListing,
  getListing,
  updateListing,
  deleteListing,
  getListings
}