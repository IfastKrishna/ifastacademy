import mongoose from "mongoose";

const followupModeSchema = new mongoose.Schema({}, { timestamps: true });

export const FollowupMode = mongoose.model("FollowupMode", followupModeSchema);
