const Subject = require("../models/subject");

exports.createSubject = async (req, res) => {
  try {
    const newsubjectData = {
      name: req.body.name,
    };

    const newSubject = await Subject.create(newsubjectData);

    res.status(201).json({
      success: true,
      subject: newSubject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
