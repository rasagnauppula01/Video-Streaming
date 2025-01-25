const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subcategory: { type: String },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Video", videoSchema);
