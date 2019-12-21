const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicationSchema = new Schema({
  applicant: {ref: "Applicant", type: String, required: true},
  college: {ref: "College", type: String, required: true},
  status: { type: String, enum: ["PENDING", "ACCEPTED", "REJECTED", 'PROCESSING'], default: 'PENDING' },

  //Courses
  course1: { type: String },
  course2: { type: String },
  course3: { type: String },
  course4: { type: String }
});

module.exports = Application = mongoose.model("Application", ApplicationSchema);
