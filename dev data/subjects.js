const Subject = require("../backend/models/subject");

const subjects = [
  {
    name: "web development",
    subjectCode: 10201102,
    examFees: 300,
    students: [],
    teachers: [],
  },
  {
    name: "DAA",
    subjectCode: 10201111,
    examFees: 300,
    students: [],
    teachers: [],
  },
  {
    name: "Python",
    subjectCode: 10201222,
    examFees: 300,
    students: [],
    teachers: [],
  },
  {
    name: "Software Engineer",
    subjectCode: 11201102,
    examFees: 300,
    students: [],
    teachers: [],
  },
  {
    name: "Cyber security",
    subjectCode: 20201102,
    examFees: 300,
    students: [],
    teachers: [],
  },
];

exports.addAllSubjects = () => {
  subjects.map((subject) => {
    Subject.create(subject);
  });
};
