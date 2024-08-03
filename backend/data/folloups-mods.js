import mongoose from "mongoose";
import { FollowupMode } from "./path/to/your/followupmode/model";

async function createDemoFollowupModes() {
  // Connect to your MongoDB database
  await mongoose.connect("your_mongodb_connection_string", {
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
