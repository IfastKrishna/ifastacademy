const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    streetAddress: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      default: "North Delhi",
      trim: true,
    },
    state: {
      type: String,
      trim: true,
      default: "Delhi",
    },
    postalCode: {
      type: String,
      trim: true,
      default: "110082",
    },
    country: {
      type: String,
      default: "India",
      trim: true,
    },
  },
  { _id: false }
);

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
    qualification: {
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
