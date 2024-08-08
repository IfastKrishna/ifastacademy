const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  todayTopic: {
    type: String,
    required: true,
  },
  problemFaced: {
    type: String,
    required: false,
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
        required: false,
      },
    },
  ],
  remarks: {
    type: String,
    required: false,
  },
});

const BatchAttendance = mongoose.model(
  "BatchAttendance",
  batchAttendanceSchema
);

module.exports = BatchAttendance;
