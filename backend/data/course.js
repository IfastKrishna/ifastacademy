const mongoose = require("mongoose");
const { Course } = require("../models/master/course.models");
require("dotenv").config();

async function createDemoCourses() {
  // Connect to your MongoDB database
  await mongoose.connect(`${process.env.MONGODB_URI}/ifastacademy`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create an array of 10 demo courses
  const demoCourses = [
    {
      name: "Introduction to Programming",
      description: "An introductory course on programming fundamentals.",
      duration: "3 months",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2024-12-01"),
      level: "Beginner",
      isActive: true,
      requirements: "Basic understanding of mathematics.",
    },
    {
      name: "Advanced Data Structures",
      description: "A course on advanced data structures and algorithms.",
      duration: "4 months",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2025-02-01"),
      level: "Advanced",
      isActive: true,
      requirements: "Knowledge of basic data structures.",
    },
    {
      name: "Web Development Bootcamp",
      description: "A comprehensive course on modern web development.",
      duration: "6 months",
      startDate: new Date("2024-08-01"),
      endDate: new Date("2025-02-01"),
      level: "Intermediate",
      isActive: true,
      requirements: "Basic HTML and CSS knowledge.",
    },
    {
      name: "Machine Learning Basics",
      description: "An introductory course on machine learning concepts.",
      duration: "3 months",
      startDate: new Date("2024-09-15"),
      endDate: new Date("2024-12-15"),
      level: "Beginner",
      isActive: true,
      requirements: "Basic statistics and programming knowledge.",
    },
    {
      name: "Database Management Systems",
      description: "A course on database management and SQL.",
      duration: "4 months",
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-12-15"),
      level: "Intermediate",
      isActive: true,
      requirements: "Basic understanding of databases.",
    },
    {
      name: "Cybersecurity Fundamentals",
      description: "A course on the basics of cybersecurity.",
      duration: "3 months",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-12-31"),
      level: "Beginner",
      isActive: true,
      requirements: "Basic understanding of computer networks.",
    },
    {
      name: "Mobile App Development",
      description: "A course on developing mobile applications.",
      duration: "5 months",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-01-31"),
      level: "Intermediate",
      isActive: true,
      requirements: "Basic programming knowledge.",
    },
    {
      name: "Artificial Intelligence",
      description: "A comprehensive course on artificial intelligence.",
      duration: "6 months",
      startDate: new Date("2024-08-01"),
      endDate: new Date("2025-01-31"),
      level: "Advanced",
      isActive: true,
      requirements: "Knowledge of machine learning and programming.",
    },
    {
      name: "Cloud Computing",
      description: "A course on cloud computing concepts and services.",
      duration: "4 months",
      startDate: new Date("2024-09-15"),
      endDate: new Date("2025-01-15"),
      level: "Intermediate",
      isActive: true,
      requirements: "Basic understanding of computer networks.",
    },
    {
      name: "Data Science with Python",
      description: "An introductory course on data science using Python.",
      duration: "4 months",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2025-02-01"),
      level: "Beginner",
      isActive: true,
      requirements: "Basic programming knowledge.",
    },
  ];

  // Save all demo courses to the database
  await Course.insertMany(demoCourses);

  console.log("10 demo courses saved successfully!");

  // Close the database connection
  mongoose.connection.close();
}

createDemoCourses().catch((error) => console.error(error));
