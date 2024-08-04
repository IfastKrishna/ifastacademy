const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchAttendance = new Schema({
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  takenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  todayTopic: {
    type: String,
    required: true,
  },
  presentStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  absentStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  attendanceDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  remarks: {
    type: String,
    required: false,
  },
});
