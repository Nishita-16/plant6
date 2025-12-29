const express = require("express");
const router = express.Router();
const Saved = require("../models/Saved");
const auth = require("../middleware/authMiddeware");

// GET saved posts
router.get("/", auth, async (req, res) => {
  try {
    const saved = await Saved.find({ user: req.user.id });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// SAVE a post
router.post("/:postId", auth, async (req, res) => {
  try {
    const already = await Saved.findOne({
      user: req.user.id,
      post: req.params.postId,
    });

    if (already) {
      return res.status(400).json({ message: "Already saved" });
    }

    const saved = new Saved({
      user: req.user.id,
      post: req.params.postId,
    });

    await saved.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
  console.log("SAVE ROUTE HIT", req.params.postId, req.user?.id);
});

module.exports = router;
