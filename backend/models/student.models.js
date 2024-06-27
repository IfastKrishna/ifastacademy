const mongoose = require("mongoose");
const { addressSchema } = require("./course-enquire.models");

const studentSchema = new mongoose.Schema(
  {
    // Basic student information
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
    },
    fatherName: {
      type: String,
      trim: true,
    },
    motherName: {
      type: String,
      trim: true,
    },
    userId: {
      type: String,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "", // avatar upload on cloudinary
    },
    // Contact information
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      type: String,
      trim: true,
    },
    enrolledCourses: [
      {
        // Many-to-many relationship with Courses
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    joiningDate: {
      type: Date,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    address: addressSchema,
    hobbies: {
      type: String,
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
