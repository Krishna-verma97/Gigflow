import express from "express";
import { submitBid, getBidsForGig } from "../controllers/bidController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Freelancer submits bid
router.post("/:gigId", protect, submitBid);

// Client views bids
router.get("/:gigId", protect, getBidsForGig);

export default router;
