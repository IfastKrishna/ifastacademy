const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema(
  {
    leadId: {
      modelName: {
        type: String, // e.g., "Student", "Employee", "Enquiry"
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
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
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    reminders: [
      {
        date: Date,
        sent: {
          type: Boolean,
          default: false,
        },
        method: String, // email, SMS, etc.
      },
    ],
    notes: [String],
  },
  { timestamps: true }
);

followUpSchema.methods.populateLead = async function () {
  const model = mongoose.model(this.leadId.modelName);
  this.leadId.data = await model.findById(this.leadId.id);
  return this;
};

const FollowUp = mongoose.model("FollowUp", followUpSchema);

module.exports = { FollowUp };
