const Teacher = require("../backend/models/teacher");
const teachers = [
  {
    name: "pritesh pande",
    phone: 8933234230,
    email: "prtesh@gmail.com",
    password: "password",
    subjects: [],
    students: [],
  },
  {
    name: "Pratik soni",
    phone: 8933249230,
    email: "pratik@gmail.com",
    password: "password",
    subjects: [],
    students: [],
  },
  {
    name: "Jagruti prajapati",
    phone: 8933249230,
    email: "jagruti@gmail.com",
    password: "password",
    subjects: [],
    students: [],
  },
  {
    name: "priyanka panchal",
    phone: 8933249230,
    email: "priyanka@gmail.com",
    password: "password",
    subjects: [],
    students: [],
  },
  {
    name: "palak dave",
    phone: 8933249230,
    email: "palak@gmail.com",
    password: "password",
    subjects: [],
    students: [],
  },
  {
    name: "Nirav Patel",
    phone: 8933249230,
    email: "nirav@gmail.com",
    password: "password",
    subjects: [],
    students: [],
  },
];

exports.addAllTeachers = () => {
  teachers.map((teacher) => {
    Teacher.create(teacher);
  });
};
