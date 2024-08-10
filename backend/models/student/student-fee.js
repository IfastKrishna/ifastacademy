const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentFeeSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    },

    paymentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeeCategory",
    },

    paymentDate: {
      type: Date,
      default: new Date(),
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
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    remarks: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const StudentFee = mongoose.model("StudentFee", studentFeeSchema);

module.exports = StudentFee;
