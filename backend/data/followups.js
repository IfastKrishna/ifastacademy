const mongoose = require("mongoose");
const FollowUp = require("./path/to/your/followup/model");

async function createDemoFollowUps() {
  // Connect to your MongoDB database
  await mongoose.connect("your_mongodb_connection_string", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Example lead and user IDs (replace these with actual ObjectIds from your Lead and User collections)
  const lead1Id = mongoose.Types.ObjectId("64b3d4b11f43f2b8c4956824");
  const lead2Id = mongoose.Types.ObjectId("64b3d4b11f43f2b8c4956825");
  const user1Id = mongoose.Types.ObjectId("64b3d4b11f43f2b8c4956826");
  const user2Id = mongoose.Types.ObjectId("64b3d4b11f43f2b8c4956827");

  // Create an array of 10 demo follow-ups
  const demoFollowUps = [
    {
      followUpId: "FU001",
      leadId: lead1Id,
      assignedTo: user1Id,
      dueDate: new Date("2024-08-10"),
      description: "Follow-up on the initial inquiry",
      status: "pending",
      reminders: [
        { date: new Date("2024-08-09"), sent: false, method: "email" },
      ],
      notes: ["Called but no response."],
    },
    {
      followUpId: "FU002",
      leadId: lead2Id,
      assignedTo: user2Id,
      dueDate: new Date("2024-08-15"),
      description: "Discuss course details",
      status: "pending",
      reminders: [{ date: new Date("2024-08-14"), sent: false, method: "SMS" }],
      notes: ["Sent email with course details."],
    },
    {
      followUpId: "FU003",
      leadId: lead1Id,
      assignedTo: user1Id,
      dueDate: new Date("2024-08-20"),
      description: "Schedule a demo class",
      status: "pending",
      reminders: [
        { date: new Date("2024-08-19"), sent: false, method: "email" },
      ],
      notes: ["Demo class scheduled for next week."],
    },
    {
      followUpId: "FU004",
      leadId: lead2Id,
      assignedTo: user2Id,
      dueDate: new Date("2024-08-25"),
      description: "Follow-up on documentation",
      status: "pending",
      reminders: [
        { date: new Date("2024-08-24"), sent: false, method: "email" },
      ],
      notes: ["Requested additional documents."],
    },
    {
      followUpId: "FU005",
      leadId: lead1Id,
      assignedTo: user1Id,
      dueDate: new Date("2024-08-30"),
      description: "Final confirmation call",
      status: "pending",
      reminders: [
        { date: new Date("2024-08-29"), sent: false, method: "phone" },
      ],
      notes: ["Left a voicemail."],
    },
    {
      followUpId: "FU006",
      leadId: lead2Id,
      assignedTo: user2Id,
      dueDate: new Date("2024-09-01"),
      description: "Confirm course enrollment",
      status: "pending",
      reminders: [
        { date: new Date("2024-08-31"), sent: false, method: "email" },
      ],
      notes: ["Waiting for response."],
    },
    {
      followUpId: "FU007",
      leadId: lead1Id,
      assignedTo: user1Id,
      dueDate: new Date("2024-09-05"),
      description: "Review course materials",
      status: "pending",
      reminders: [{ date: new Date("2024-09-04"), sent: false, method: "SMS" }],
      notes: ["Sent course materials via email."],
    },
    {
      followUpId: "FU008",
      leadId: lead2Id,
      assignedTo: user2Id,
      dueDate: new Date("2024-09-10"),
      description: "First feedback call",
      status: "pending",
      reminders: [
        { date: new Date("2024-09-09"), sent: false, method: "phone" },
      ],
      notes: ["Scheduled a feedback session."],
    },
    {
      followUpId: "FU009",
      leadId: lead1Id,
      assignedTo: user1Id,
      dueDate: new Date("2024-09-15"),
      description: "Discuss progress",
      status: "pending",
      reminders: [
        { date: new Date("2024-09-14"), sent: false, method: "email" },
      ],
      notes: ["Progress meeting scheduled."],
    },
    {
      followUpId: "FU010",
      leadId: lead2Id,
      assignedTo: user2Id,
      dueDate: new Date("2024-09-20"),
      description: "Final evaluation",
      status: "pending",
      reminders: [{ date: new Date("2024-09-19"), sent: false, method: "SMS" }],
      notes: ["Evaluation process initiated."],
    },
  ];

  // Save all demo follow-ups to the database
  await FollowUp.insertMany(demoFollowUps);

  console.log("10 demo follow-ups saved successfully!");

  // Close the database connection
  mongoose.connection.close();
}

createDemoFollowUps().catch((error) => console.error(error));
