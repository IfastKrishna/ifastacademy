require("dotenv").config();
const mongoose = require("mongoose");
const FollowupMode = require("../models/master/follow-up-mode.models");

async function createDemoFollowupModes() {
  // Connect to your MongoDB database
  await mongoose.connect(`${process.env.MONGODB_URI}/ifastacademy`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create an array of 10 demo follow-up modes
  const demoFollowupModes = [
    { followupMode: "Phone Call" },
    { followupMode: "Email" },
    { followupMode: "SMS" },
    { followupMode: "WhatsApp" },
    { followupMode: "In-Person Meeting" },
    { followupMode: "Video Call" },
    { followupMode: "Social Media" },
    { followupMode: "Post Mail" },
    { followupMode: "Webinar" },
    { followupMode: "Live Chat" },
  ];

  // Save all demo follow-up modes to the database
  await FollowupMode.insertMany(demoFollowupModes);

  console.log("10 demo follow-up modes saved successfully!");

  // Close the database connection
  mongoose.connection.close();
}

createDemoFollowupModes().catch((error) => console.error(error));
