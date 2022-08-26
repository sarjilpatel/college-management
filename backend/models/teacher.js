const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: [true, "email already exist"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [6, "password length must be 6 characters"],
    select: false,
  },
  phone: {
    type: Number,
    required: [true, "please enter phone number"],
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  students: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
  ],
});

module.exports = mongoose.model("Teacher", teacherSchema);
