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

    batchTiming: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    monthlyFee: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
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
