import express from "express";
import { submitBid, getBidsForGig, hireBid } from "../controllers/bidController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Freelancer submits bid
router.post("/:gigId", protect, submitBid);

// Client views bids
router.get("/:gigId", protect, getBidsForGig);

//hire
router.patch("/:gigId/hire/:bidId", protect, hireBid);

export default router;
