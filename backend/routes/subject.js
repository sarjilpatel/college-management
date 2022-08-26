const express = require("express");
const { createSubject } = require("../controllers/subject");

const router = express.Router();

router.route("/subjects").post(createSubject);

module.exports = router;
