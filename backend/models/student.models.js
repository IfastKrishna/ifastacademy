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

    dob: {
      type: Date,
      required: true,
    },

    ifastId: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    avatar: {
      type: String,
    },
    // Contact information
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNo: {
      type: String,
      trim: true,
      required: true,
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
