const { Course } = require("../../../models/master/course/course.models");
const handleErrors = require("../../../utils/handleErrors");

const getCourse = async (req, res) => {
  try {
    const { pageSize = 10, page = 1, search = "" } = req.query;
    const currentPageInt = parseInt(page, 10);
    const pageSizeInt = parseInt(pageSize, 10);
    const skip = (currentPageInt - 1) * pageSizeInt;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [courses, totalCount] = await Promise.all([
      Course.aggregate([
        { $match: query }, // Add this line to filter based on the query
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: pageSizeInt },
      ]),
      Course.countDocuments(query), // Add the query to count only the filtered documents
    ]);

    res.status(200).json({
      data: courses,
      count: totalCount,
      success: true,
      message: "Courses fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getCourse;
