import express from "express";
import { submitBid, getBidsForGig, hireBid } from "../controllers/bidController.js";
import protect from "../middlewares/authMiddleware.js";
import Gig from "../models/Gig.js"; 
import Bid from "../models/Bid.js"; 


const router = express.Router();

// Freelancer submits bid
router.post("/:gigId", protect, submitBid);

// Client views bids
router.get("/:gigId", protect, getBidsForGig);

//hire
router.patch("/:gigId/hire/:bidId", protect, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    // 🔐 Owner check
   const ownerId =
  gig.owner._id ? gig.owner._id.toString() : gig.owner.toString();

if (ownerId !== req.user._id.toString()) {
  return res.status(403).json({ message: "Not authorized" });
}


    // Assign gig
    gig.status = "assigned";
    await gig.save();

    // Mark hired bid
    await Bid.findByIdAndUpdate(req.params.bidId, {
      status: "hired"
    });

    // Reject other bids
    await Bid.updateMany(
      { gig: req.params.gigId, _id: { $ne: req.params.bidId } },
      { status: "rejected" }
    );

    res.json({ message: "Gig assigned successfully" });

  } catch (err) {
    console.error("❌ Hire error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


export default router;
