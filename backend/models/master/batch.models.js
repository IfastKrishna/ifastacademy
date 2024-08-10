const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    instructors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],

    batchTiming: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", batchSchema);

module.exports = { Batch };
