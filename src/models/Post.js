const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  media: {
    required:true,
    path: { type: String, require: true },
    filename: { type: String, require: true },
  },
  description: {
    type: String,
    required:true,
  },
  hashtag: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const model = mongoose.model("Post", schema);

module.exports = model;
