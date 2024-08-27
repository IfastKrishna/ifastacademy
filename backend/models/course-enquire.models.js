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
    },

    qualification: {
      type: String,
      required: true,
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

    email: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: String,
      required: true,
    },

    alternativePhoneNo: {
      type: String,
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
      enum: ["high", "medium", "low"],
      required: true,
    },

    leadSource: {
      type: String,
      required: true,
    },

    enquireDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "cancelled"],
    },
  },
  { timestamps: true }
);

const CourseEnquire = mongoose.model("CourseEnquire", courseEnquireSchema);

module.exports = { CourseEnquire };
