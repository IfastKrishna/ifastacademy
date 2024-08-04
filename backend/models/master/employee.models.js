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

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
    jobTitle: {
      type: String,
      required: true,
      trim: true,
      enum: ["teacher", "staff"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    address: addressSchema,
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { Employee };
