const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

//Importing routes
const adminRoute = require("./routes/admin");
const studentRoute = require("./routes/student");
const teacherRoute = require("./routes/teacher");
const subjectRoute = require("./routes/subject");

//Using routes
app.use("/api/v1", adminRoute);
app.use("/api/v1", studentRoute);
app.use("/api/v1", teacherRoute);
app.use("/api/v1", subjectRoute);

module.exports = app;
