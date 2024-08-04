require("dotenv").config();
const mongoose = require("mongoose");
const LeadSource = require("../models/master/lead-source.models");

async function createDemoLeadSources() {
  await mongoose.connect(`${process.env.MONGODB_URI}/ifastacademy`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const demoLeadSources = [
    {
      name: "Website",
      description: "Lead generated from the official website.",
      contact: "www.ifastacademy.com",
      isActive: true,
    },
    {
      name: "Phone Inquiry",
      description: "Lead generated from a phone inquiry.",
      contact: "123-456-7890",
      isActive: true,
    },
    {
      name: "Social Media",
      description: "Lead generated from social media platforms.",
      contact: "www.facebook.com/ifastacademy",
      isActive: true,
    },
    {
      name: "Referral",
      description: "Lead generated from a referral.",
      contact: "John Doe",
      isActive: true,
    },
  ];

  await LeadSource.insertMany(demoLeadSources);

  console.log("4 demo lead sources saved successfully!");

  mongoose.connection.close();
}

createDemoLeadSources().catch((error) => console.error(error));
