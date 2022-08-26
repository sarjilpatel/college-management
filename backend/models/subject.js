const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subject must contain subject name"],
    trim: true,
  },
  subjectCode: {
    type: Number,
    required: [true, "Subject must contain subject code"],
  },
  examFees: {
    type: Number,
  },
  students: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
  ],
  teachers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Teacher",
    },
  ],
});

module.exports = mongoose.model("Subject", subjectSchema);
