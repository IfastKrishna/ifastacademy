const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema(
  {
    followUpId: {
      type: String,
      required: true,
      unique: true,
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead", // Assuming you have a Lead model
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "rescheduled"],
      default: "pending",
    },
    reminders: [
      {
        date: Date,
        sent: Boolean,
        method: String, // email, SMS, etc.
      },
    ],
    notes: [String],
  },
  { timestamps: true }
);

const FollowUp = mongoose.model("FollowUp", followUpSchema);

module.exports = FollowUp;
