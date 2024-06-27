const mongoose = require("mongoose");
const { addressSchema } = require("./master/employee.models");

const courseEnquireSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    qulification: {
      type: String,
      required: true,
    },
    collageOrSchool: {
      type: String,
      enum: ["collage", "school"],
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    mobileNo: {
      type: String,
      required: true,
    },
    alternativeMobileNo: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    address: addressSchema,
    courseInterest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
    ],
    interestLevel: {
      type: String,
      required: true,
    },
    followupDetails: {
      type: String,
    },
    requiredDemoClass: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    nextFollowupDate: {
      type: Date,
    },
    leadSource: {
      type: String,
      required: true,
    },
    enquireDate: {
      type: Date,
      required: true,
    },
    refName: {
      type: String,
    },
    assignTo: {
      type: String,
      required: true,
    },
    note: String,
  },
  { timestamps: true }
);

const CourseEnquire = mongoose.model("CourseEnquire", courseEnquireSchema);

module.exports = { CourseEnquire };
