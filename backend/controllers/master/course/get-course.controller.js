const { Course } = require("../../../models/master/course.models");
const handleErrors = require("../../../utils/handleErrors");

const getCourse = async (req, res) => {
  try {
    const { pageSize = 10, currentPage = 1 } = req.query;
    const currentPageInt = parseInt(currentPage, 10);
    const pageSizeInt = parseInt(pageSize, 10);
    const skip = (currentPageInt - 1) * pageSizeInt;

    const [courses, totalCount] = await Promise.all([
      Course.aggregate([
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: pageSizeInt },
      ]),
      Course.countDocuments(),
    ]);

    res.status(200).json({
      data: courses,
      totalCount,
      message: "Courses fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getCourse;
