const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, "please enter phone number"],
  },
  parentsName: {
    type: String,
    required: [true, "please enter parents name"],
    trim: true,
  },
  parentsPhone: {
    type: Number,
    required: [true, "please enter parent's phone number"],
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
  address: {
    type: String,
    required: [true, "please enter password"],
  },
  enrollmentNumber: {
    type: Number,
    required: [true, "please enter enrollmentNumber"],
  },
  sem: {
    type: Number,
    required: [true, "please enter sem"],
  },
  totalBacklogs: {
    type: Number,
    default: 0,
  },
  feesPaid: {
    type: Boolean,
    default: false,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  teachers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Teacher",
    },
  ],
});

studentSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("Student", studentSchema);
