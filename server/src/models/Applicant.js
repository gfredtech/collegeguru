const mongoose = require("mongoose");
const { Schema } = mongoose;
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const ApplicantSchema = new Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  passwordHash: { type: String, required: false },
  number: { type: String },
  dob: { type: Date },
  address: { type: String },
  avatar: { type: String },
  relativeName: { type: String },
  relativeNumber: { type: String },
  relativeOccupation: { type: String },
  aggregate: {type: Number, required: true, default: Math.floor(getRandomArbitrary(6, 24))},

  wassceCourses: [
    {
      courseName: { type: String },
      grade: {
        type: String,
        enum: ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "F9"]
      }
    }
  ]
});

module.exports = Applicant = mongoose.model("Applicant", ApplicantSchema);
