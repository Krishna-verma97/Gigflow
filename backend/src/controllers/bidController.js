import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

// SUBMIT BID (Freelancer)
export const submitBid = async (req, res) => {
  try {
    const { amount, message } = req.body;
    const gigId = req.params.gigId;

    if (!amount || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig || gig.status !== "open") {
      return res.status(400).json({ message: "Gig not available" });
    }

    // Prevent owner from bidding on own gig
    if (gig.owner.toString() === req.user._id.toString()) {
      return res.status(403).json({ message: "You cannot bid on your own gig" });
    }

    const bid = await Bid.create({
      gig: gigId,
      freelancer: req.user._id,
      amount,
      message,
    });

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VIEW BIDS (ONLY GIG OWNER)
export const getBidsForGig = async (req, res) => {
  try {
    const gigId = req.params.gigId;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Owner check
    if (gig.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bids = await Bid.find({ gig: gigId })
      .populate("freelancer", "name email")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// HIRE FREELANCER (CLIENT)
export const hireBid = async (req, res) => {
  try {
    const { gigId, bidId } = req.params;

    // 1. Find gig
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // 2. Only owner can hire
    if (gig.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to hire" });
    }

    // 3. Prevent double hiring
    if (gig.status === "assigned") {
      return res.status(400).json({ message: "Gig already assigned" });
    }

    // 4. Find selected bid
    const selectedBid = await Bid.findById(bidId);
    if (!selectedBid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    // 5. Update gig status
    gig.status = "assigned";
    await gig.save();

    // 6. Update bids
    await Bid.updateMany(
      { gig: gigId },
      { status: "rejected" }
    );

    selectedBid.status = "hired";
    await selectedBid.save();

    res.json({
      message: "Freelancer hired successfully",
      hiredBid: selectedBid,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
