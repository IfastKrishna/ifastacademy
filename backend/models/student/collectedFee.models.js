const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectedStudentFeeSchema = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },

  paymentType: {
    type: String,
    enum: ["month-wise", "course-wise", "one-time", "other"],
    default: "month-wise",
  },

  paymentDate: {
    type: Date,
    default: Date.now,
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "Online", "Other"],
    default: "Cash",
  },

  payment: [
    {
      categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FeeCategory",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        validate: {
          validator: (value) => value > 0,
          message: "amount must be a positive number",
        },
      },
      month: {
        type: String,
        default: new Date().toLocaleString("default", { month: "long" }),
      },
    },
  ],

  paymentStatus: {
    type: String,
    enum: ["Paid", "Unpaid"],
    required: true,
  },

  confirmation: {
    type: Boolean,
    default: false,
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

// Add indexes if needed:
collectedStudentFeeSchema.index({ studentId: 1 });

const CollectedStudentFee = mongoose.model(
  "CollectedStudentFee",
  collectedStudentFeeSchema
);

module.exports = CollectedStudentFee;
