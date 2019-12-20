const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicationSchema = new Schema({
  applicantId: {
    ref: "Applicant",
    type: String
  },
  college: {
    ref: "College"
  },
  status: { type: String, enum: ["PENDING", "SUBMITTED"] },
  //Courses
  course1: { type: String },
  course2: { type: String },
  course3: { type: String },
  course4: { type: String }
});

module.exports = Application = mongoose.model("Application", ApplicationSchema);
