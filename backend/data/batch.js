const mongoose = require("mongoose");
const { Batch } = require("../models/master/batch.models");
require("dotenv").config();

async function createDemoBatches() {
  // Connect to your MongoDB database
  await mongoose.connect(`${process.env.MONGODB_URI}/ifastacademy`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create an array of 10 demo batches
  const demoBatches = [
    {
      name: "Batch A",
      course: "66aee642ebc904040cd087f7",
      startDate: new Date("2024-08-01"),
      endDate: new Date("2024-12-01"),
      students: [],
      instructors: [],
      batchTiming: "09:00 AM - 11:00 AM",
      capacity: 20,
      description: "First batch for the Introduction to Programming course.",
    },
    {
      name: "Batch B",
      course: "66aee642ebc904040cd087f8",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-01-01"),
      students: [],
      instructors: [],
      batchTiming: "10:00 AM - 12:00 PM",
      capacity: 15,
      description: "Batch for the Advanced Data Structures course.",
    },
    {
      name: "Batch C",
      course: "66aee642ebc904040cd087f7",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-12-31"),
      students: [],
      instructors: [],
      batchTiming: "11:00 AM - 01:00 PM",
      capacity: 25,
      description: "Second batch for the Introduction to Programming course.",
    },
    {
      name: "Batch D",
      course: "66aee642ebc904040cd087f7",
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-12-15"),
      students: [],
      instructors: [],
      batchTiming: "01:00 PM - 03:00 PM",
      capacity: 30,
      description: "Batch for the Advanced Data Structures course.",
    },
  ];

  // Save all demo batches to the database
  await Batch.insertMany(demoBatches);

  console.log("10 demo batches saved successfully!");

  // Close the database connection
  mongoose.connection.close();
}

createDemoBatches().catch((error) => console.error(error));
