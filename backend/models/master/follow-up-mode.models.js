import mongoose from "mongoose";

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

export const FollowupMode = mongoose.model("FollowupMode", followupModeSchema);
