const mongoose = require("mongoose");
const FeeCategory = require("./path/to/your/feecategory/model");

async function createDemoFeeCategories() {
  // Connect to your MongoDB database
  await mongoose.connect("your_mongodb_connection_string", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create an array of 10 demo fee categories
  const demoFeeCategories = [
    {
      name: "Monthly Fee",
      description: "The fee charged for the instruction of a student.",
    },
    {
      name: "Admission Fee",
      description: "The fee charged for the use of library resources.",
    },
    {
      name: "Examination Fee",
      description: "The fee charged for appearing in examinations.",
    },
    {
      name: "Other Fee",
      description: "The fee charged for other various services and activities.",
    },
  ];

  // Save all demo fee categories to the database
  await FeeCategory.insertMany(demoFeeCategories);

  console.log("10 demo fee categories saved successfully!");

  // Close the database connection
  mongoose.connection.close();
}

createDemoFeeCategories().catch((error) => console.error(error));
