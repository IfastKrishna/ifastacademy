const mongoose = require("mongoose");
const { FollowUp } = require("../models/followup.models");
require("dotenv").config();

async function insertDemoData() {
  await mongoose.connect(`${process.env.MONGODB_URI}/ifastacademy`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const followUps = [
    new FollowUp({
      leadId: { modelName: "Student", id: "6686f218862ee1a8d199f6cf" },
      assignedTo: "66861bc09e6639cb54299a20", // Example User ID
      dueDate: new Date(),
      description: "Follow up with student regarding enrollment",
      status: "pending",
      reminders: [{ date: new Date(), sent: false, method: "email" }],
      notes: ["Initial contact made."],
    }),
    new FollowUp({
      leadId: { modelName: "CourseEnquire", id: "66aee4cb0a4bc3ad9e7f596d" },
      assignedTo: "66861bc09e6639cb54299a20", // Example User ID
      dueDate: new Date(),
      description: "Follow up with student regarding scholarship",
      status: "pending",
      reminders: [{ date: new Date(), sent: false, method: "SMS" }],
      notes: ["Scholarship information sent."],
    }),
    new FollowUp({
      leadId: { modelName: "CourseEnquire", id: "66aee4cb0a4bc3ad9e7f596e" },
      assignedTo: "66861bc09e6639cb54299a20", // Example User ID
      dueDate: new Date(),
      description: "Follow up with employee regarding onboarding",
      status: "pending",
      reminders: [{ date: new Date(), sent: false, method: "email" }],
      notes: ["Onboarding documents reviewed."],
    }),
  ];

  await FollowUp.insertMany(followUps);

  console.log("Demo data inserted successfully");
  mongoose.disconnect();
}

insertDemoData().catch((err) => console.error(err));
