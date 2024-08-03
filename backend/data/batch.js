const mongoose = require("mongoose");
const { Batch } = require("./path/to/your/batch/model");

async function createDemoBatches() {
  // Connect to your MongoDB database
  await mongoose.connect("your_mongodb_connection_string", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Example course and student IDs (replace these with actual ObjectIds from your Course and Student collections)
  const course1Id = mongoose.Types.ObjectId("64b3d4b11f43f2b8c4956824");
  const course2Id = mongoose.Types.ObjectId("64b3d4b11f43f2b8c4956825");
  const student1Id = mongoose.Types.ObjectId("64b3d4b11f43f2b8c4956826");
  const student2Id = mongoose.Types.ObjectId("64b3d4b11f43f2b8c4956827");
  const student3Id = mongoose.Types.ObjectId("64b3d4b11f43f2b8c4956828");

  // Create an array of 10 demo batches
  const demoBatches = [
    {
      name: "Batch A",
      course: course1Id,
      startDate: new Date("2024-08-01"),
      endDate: new Date("2024-12-01"),
      students: [student1Id, student2Id],
      capacity: 20,
      description: "First batch for the Introduction to Programming course.",
      batchTiming: "09:00 AM - 11:00 AM",
    },
    {
      name: "Batch B",
      course: course2Id,
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-01-01"),
      students: [student3Id],
      capacity: 15,
      description: "Batch for the Advanced Data Structures course.",
      batchTiming: "10:00 AM - 12:00 PM",
    },
    {
      name: "Batch C",
      course: course1Id,
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-12-31"),
      students: [student1Id],
      capacity: 25,
      description: "Second batch for the Introduction to Programming course.",
      batchTiming: "11:00 AM - 01:00 PM",
    },
    {
      name: "Batch D",
      course: course2Id,
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-12-15"),
      students: [student2Id],
      capacity: 30,
      description: "Batch for the Advanced Data Structures course.",
      batchTiming: "01:00 PM - 03:00 PM",
    },
    {
      name: "Batch E",
      course: course1Id,
      startDate: new Date("2024-09-15"),
      endDate: new Date("2025-01-15"),
      students: [student3Id],
      capacity: 10,
      description: "Third batch for the Introduction to Programming course.",
      batchTiming: "02:00 PM - 04:00 PM",
    },
    {
      name: "Batch F",
      course: course2Id,
      startDate: new Date("2024-10-01"),
      endDate: new Date("2025-02-01"),
      students: [student1Id, student2Id, student3Id],
      capacity: 20,
      description: "Batch for the Advanced Data Structures course.",
      batchTiming: "03:00 PM - 05:00 PM",
    },
    {
      name: "Batch G",
      course: course1Id,
      startDate: new Date("2024-08-01"),
      endDate: new Date("2024-12-01"),
      students: [],
      capacity: 25,
      description: "Fourth batch for the Introduction to Programming course.",
      batchTiming: "04:00 PM - 06:00 PM",
    },
    {
      name: "Batch H",
      course: course2Id,
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-01-01"),
      students: [student1Id, student3Id],
      capacity: 15,
      description: "Batch for the Advanced Data Structures course.",
      batchTiming: "05:00 PM - 07:00 PM",
    },
    {
      name: "Batch I",
      course: course1Id,
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-12-31"),
      students: [student2Id, student3Id],
      capacity: 20,
      description: "Fifth batch for the Introduction to Programming course.",
      batchTiming: "06:00 PM - 08:00 PM",
    },
    {
      name: "Batch J",
      course: course2Id,
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-12-15"),
      students: [student1Id, student2Id],
      capacity: 30,
      description: "Batch for the Advanced Data Structures course.",
      batchTiming: "07:00 PM - 09:00 PM",
    },
  ];

  // Save all demo batches to the database
  await Batch.insertMany(demoBatches);

  console.log("10 demo batches saved successfully!");

  // Close the database connection
  mongoose.connection.close();
}

createDemoBatches().catch((error) => console.error(error));
