const { FollowUp } = require("../models/follow-up"); // Adjust the path as needed

// Function to get today's follow-ups
const getTodaysFollowUps = async (req, res) => {
  try {
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const endOfDay = new Date().setHours(23, 59, 59, 999);

    // Find today's follow-ups
    let todaysFollowUps = await FollowUp.find({
      dueDate: { $gte: startOfDay, $lt: endOfDay },
    }).populate("assignedTo"); // Populate assignedTo for user details

    // Populate the lead based on the model name and id in leadId
    for (let followUp of todaysFollowUps) {
      const model = mongoose.model(followUp.leadId.modelName);
      followUp.leadId.data = await model.findById(followUp.leadId.id);
    }

    if (!todaysFollowUps.length) {
      return res.status(404).json({ message: "No follow-ups for today." });
    }

    return res.status(200).json({ followUps: todaysFollowUps });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error fetching follow-ups", details: err.message });
  }
};

module.exports = { getTodaysFollowUps };
