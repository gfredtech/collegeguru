const mongoose = require("mongoose");
const { Schema } = mongoose;

const CollegeSchema = new Schema({
  name: { type: String, required: true },
  collegeID: { type: String, required: true },
  password: { type: String, required: true },
  courses: [
    {
      courseName: { type: String, required: true },
      courseID: { type: mongoose.Schema.Types.ObjectId },
      max: { type: Number }
    }
  ]
});

module.exports = College = mongoose.model("College", CollegeSchema);
