const express = require("express");
const router = express.Router();
const Video = require("../models/Video");
const uploadVideo = require("../config/MulterConfig");

// Add Video Route (Save file in the database as Cloudinary URL)
router.post("/add-videos", uploadVideo.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const { title, description, category, subcategory } = req.body;

    // Save the Cloudinary URL in the database
    const video = new Video({
      title,
      description,
      category,
      subcategory,
      url: req.file.path, // Cloudinary URL
    });

    const savedVideo = await video.save();
    return res
      .status(200)
      .json({ message: "Video added successfully", video: savedVideo });
  } catch (error) {
    console.error("Error in /add-videos route:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Update Video Route (Update Video with file and other details)
router.put(
  "/update-videos/:id",
  uploadVideo.single("video"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, category, subcategory } = req.body;

      const updateData = { title, description, category, subcategory };

      if (req.file) {
        updateData.url = req.file.path; // Cloudinary URL
      }

      const updatedVideo = await Video.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedVideo) {
        return res.status(404).json({ message: "Video not found" });
      }

      return res
        .status(200)
        .json({ message: "Video updated successfully", video: updatedVideo });
    } catch (error) {
      console.error("Error in /update-videos/:id route:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

// Delete Video Route (Delete Video)
router.delete("/delete-videos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await Video.findByIdAndDelete(id);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res
      .status(200)
      .json({ message: "Video deleted successfully", video: deletedVideo });
  } catch (error) {
    console.error("Error in /delete-videos/:id route:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Get All Videos (No Admin Check)
router.get("/get-videos", async (req, res) => {
  try {
    const videos = await Video.find().populate("category");

    if (!videos) {
      return res.status(404).json({ message: "Videos not found" });
    }

    return res.status(200).json({ message: "Videos found", videos });
  } catch (error) {
    console.error("Error fetching video details:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Get Single Video (No Admin Check)
router.get("/get-video/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id).populate("category");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json({ message: "Video found", video });
  } catch (error) {
    console.error("Error fetching video details:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
