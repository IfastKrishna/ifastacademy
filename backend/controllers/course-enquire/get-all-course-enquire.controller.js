const { CourseEnquire } = require("../../models/course-enquire.models");
const handleErrors = require("../../utils/handleErrors");

// Controller function to get all inquiries with pagination and search
const getCourseInquiries = async (req, res) => {
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
        { firstName: regex },
        { lastName: regex },
        { email: regex },
      ];
    }

    // Aggregate query
    const results = await CourseEnquire.aggregate([
      { $match: searchCriteria },
      {
        $lookup: {
          from: "courses",
          localField: "courseInterest",
          foreignField: "_id",
          as: "courseInterest",
        },
      },

      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: (pageNumber - 1) * size }, { $limit: size }],
        },
      },
    ]);

    // Extract metadata and data
    const total = results[0].metadata[0]?.total || 0;
    const data = results[0].data;

    // Send response
    res.status(200).json({
      count: total,
      data,
      message: "Course inquiries fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getCourseInquiries;
