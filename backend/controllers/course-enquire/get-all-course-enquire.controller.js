const { CourseEnquire } = require("../../models/course-enquire.models");

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
    res.json({
      count: total,
      data,
    });
  } catch (error) {
    console.error("Error fetching course inquiries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getCourseInquiries;
