var mongoose = require("mongoose");
var postSchema = mongoose.Schema({
  username: { type: String },
  userId: { type: String },
  description: String,
  category: String,
  img: String,
  date: { type: Date, default: Date.now },
  comments: { type: Array, comment: String, commentBy: String },
  likes: [String]
});

module.exports = mongoose.model("postUpload", postSchema);
