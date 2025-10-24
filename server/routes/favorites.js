const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("favorites");
    res.json(user.favorites || []);
  } catch (error) {
    console.error("Get favorites error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { seriesId, name, poster_path } = req.body;

    const user = await User.findById(req.user.id);

    const alreadyFavorited = user.favorites.some(
      (fav) => fav.seriesId === seriesId
    );

    if (alreadyFavorited) {
      return res.status(400).json({ message: "Series already in favorites" });
    }

    user.favorites.unshift({ seriesId, name, poster_path });
    await user.save();

    res.json(user.favorites);
  } catch (error) {
    console.error("Add favorite error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:seriesId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites = user.favorites.filter(
      (fav) => fav.seriesId !== parseInt(req.params.seriesId)
    );

    await user.save();

    res.json(user.favorites);
  } catch (error) {
    console.error("Remove favorite error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/check/:seriesId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFavorited = user.favorites.some(
      (fav) => fav.seriesId === parseInt(req.params.seriesId)
    );
    res.json({ isFavorited });
  } catch (error) {
    console.error("Check favorite error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;