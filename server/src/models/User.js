const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  passwordHash: { type: String, required: true }
});

module.exports = User = mongoose.model("User", UserSchema);
