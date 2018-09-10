var mongoose = require("mongoose");
var personSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  psw: String,
  verified: { type: Boolean, default: false }
});
module.exports = mongoose.model("registered", personSchema);
