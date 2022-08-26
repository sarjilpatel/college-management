const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
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
});

adminSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_ADMIN);
};

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
