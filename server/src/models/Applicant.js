const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicantSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  number: { type: String },
  dob: { type: Date },
  address: { type: String },
  avatar: { type: String },
  relativeName: { type: String },
  relativeNumber: { type: String },
  relativeOccupation: { type: String },
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
