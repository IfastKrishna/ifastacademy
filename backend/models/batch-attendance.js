const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentAttendanceSchema = new Schema({
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
});

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
  studentsAttendance: [studentAttendanceSchema],
  generalRemarks: {
    type: String,
  },
});

const BatchAttendance = mongoose.model(
  "BatchAttendance",
  batchAttendanceSchema
);

module.exports = BatchAttendance;
