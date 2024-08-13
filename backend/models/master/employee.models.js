const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: "North Delhi",
    },
    state: {
      type: String,
      default: "Delhi",
    },
    postalCode: {
      type: String,
      default: "110082",
    },
    country: {
      type: String,
      default: "India",
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

    ifastId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    dob: {
      type: Date,
      required: true,
    },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dkkgmzpqd/image/upload/v1634360344/IFAST/avatars/placeholder.png",
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNo: {
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

    batchIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
      },
    ],
    joiningDate: {
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
