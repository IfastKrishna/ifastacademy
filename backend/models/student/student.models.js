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
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dzegosfst/image/upload/v1720065923/avatar_25_ixmiwb.jpg",
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

    enrolledBatch: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
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

    monthlyAttendanceReport: [
      {
        present: {
          type: Number,
          default: 0,
        },
        absent: {
          type: Number,
          default: 0,
        },
        month: {
          type: String,
        },
        year: {
          type: String,
        },
        batchId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Batch",
        },
      },
    ],

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
