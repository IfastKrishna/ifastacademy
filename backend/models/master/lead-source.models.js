const mongoose = require("mongoose");

const leadSourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    contact: {
      type: String, // Website URL, phone number, etc. (adjust type as needed)
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const LeadSource = mongoose.model("LeadSource", leadSourceSchema);
module.exports = { LeadSource };
