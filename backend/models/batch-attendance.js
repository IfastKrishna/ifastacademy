const mongoose = require("mongoose");
const { Schema } = mongoose;

const batchAttendanceSchema = new Schema({
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  takenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  todayTopic: {
    type: String,
    required: true,
  },
  problemFaced: {
    type: String,
  },
  studentsAttendance: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: ["present", "absent"],
      },
      remarks: {
        type: String,
      },
    },
  ],
  generalRemarks: {
    type: String,
  },
});

const BatchAttendance = mongoose.model(
  "BatchAttendance",
  batchAttendanceSchema
);

module.exports = BatchAttendance;
