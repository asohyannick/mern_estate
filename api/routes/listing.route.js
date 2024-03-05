import express from "express";
import listing from '../controllers/listing.controller.js'
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
router.post("/create", verifyToken, listing.createListing);
router.delete("/delete/:id", verifyToken, listing.deleteListing);
router.put("/update/:id", verifyToken, listing.updateListing);
router.get("/getListing/:id", listing.getListing);
router.get('/getListings', listing.getListings);
export default router;
