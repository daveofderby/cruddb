const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["child", "adult", "adventure", "horror", "other"],
  },
  lat: Number,
  long: Number,
});

const Story = new mongoose.model("story", storySchema);

module.exports = Story;
