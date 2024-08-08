const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentFeeSchema = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  paymentType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "feeCategory",
  },
  paymentDate: {
    type: Date,
    default: Date.now,
    required: true,
  },

  monthlyFee: {
    type: Number,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  month: {
    type: String,
    required: true,
  },

  // Reference to the payment reference number or transaction number
  paymentReference: {
    type: String,
    required: false,
  },

  collectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  dueDate: {
    type: Date,
  },

  remarks: {
    type: String,
    required: false,
  },
});

const StudentFee = mongoose.model("StudentFee", studentFeeSchema);

module.exports = StudentFee;
