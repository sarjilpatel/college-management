const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

exports.isAdminAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_ADMIN);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "You do not have access to this page",
      });
    }

    req.admin = await Admin.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
