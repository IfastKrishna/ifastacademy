const { FollowUp } = require("../../models/followup.models");
const mongoose = require("mongoose");
const getAllFollowups = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, search } = req.query;

    // Convert page and pageSize to integers
    const pageNumber = parseInt(page, 10);
    const size = parseInt(pageSize, 10);

    // Prepare search criteria
    const searchCriteria = {};
    if (search) {
      const regex = new RegExp(search, "i"); // Case-insensitive search
      searchCriteria.$or = [
        { description: regex },
        { status: regex },
        { notes: regex },
      ];
    }

    const followUps = await FollowUp.find(searchCriteria)
      .skip((pageNumber - 1) * size)
      .limit(size)
      .populate({
        path: "assignedTo",
        select: "_id firstName lastName email phoneNo",
      });

    const populatedFollowUps = await Promise.all(
      followUps.map(async (followUp) => {
        // Step 2: Determine the collection name based on modelName
        let collectionName;
        switch (followUp.leadId.modelName) {
          case "Student":
            collectionName = "students";
            break;
          case "Employee":
            collectionName = "employees";
            break;
          case "CourseEnquire":
            collectionName = "courseenquires";
            break;
          default:
            collectionName = null;
        }

        // Step 3: Populate leadDetails if collectionName is determined
        if (collectionName) {
          const leadDetails = await mongoose.connection
            .collection(collectionName)
            .findOne({ _id: followUp.leadId.id });

          followUp = followUp.toObject();
          followUp.leadDetails = leadDetails;
        }

        return followUp;
      })
    );

    const results = {
      metadata: {
        total: await FollowUp.countDocuments(searchCriteria),
      },
      data: populatedFollowUps,
    };

    // Assuming "results" contains the aggregated data
    const total = results.metadata.total || 0;
    const data = results.data;

    // Send response
    res.json({
      count: total,
      page: pageNumber,
      pageSize: size,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllFollowups;
