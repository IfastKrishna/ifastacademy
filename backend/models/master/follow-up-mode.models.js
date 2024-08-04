const mongoose = require("mongoose");

const followupModeSchema = new mongoose.Schema(
  {
    followupMode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const FollowupMode = mongoose.model("FollowupMode", followupModeSchema);
module.exports = FollowupMode;
