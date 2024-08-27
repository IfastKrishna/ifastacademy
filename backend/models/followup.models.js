const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema(
  {
    leadId: {
      collectionName: {
        type: String,
        required: true,
        enum: ["students", "employees", "courseenquires"],
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    dueDate: {
      type: Date,
      required: true,
    },

    followupDetails: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "canceled", "rescheduled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FollowUp = mongoose.model("FollowUp", followUpSchema);

module.exports = { FollowUp };
