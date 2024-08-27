const { default: mongoose } = require("mongoose");
const { FollowUp } = require("../../models/followup.models");
const handleErrors = require("../../utils/handleErrors");

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
      followUps.map(async (followup) => {
        // Step 3: Populate leadDetails if collectionName is determined
        if (followup?.leadId?.collectionName) {
          const leadDetails = await mongoose.connection
            .collection(followup?.leadId?.collectionName)
            .findOne({ _id: followup?.leadId?.id });

          followup = followup.toObject();
          followup.leadDetails = leadDetails;
        }

        return followup;
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
    handleErrors(error, res);
  }
};

module.exports = getAllFollowups;
