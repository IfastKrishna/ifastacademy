const { Course } = require("../../../models/master/course.models");
const handleErrors = require("../../../utils/handleErrors");

const searchCourse = async (req, res) => {
  try {
    const {
      name,
      level,
      instructor,
      duration,
      isActive,
      startDate,
      endDate,
      pageSize = 10,
      currentPage = 1,
    } = req.query;

    const match = {};

    if (name) {
      match.name = { $regex: new RegExp(name, "i") };
    }
    if (level) {
      match.level = level;
    }
    if (instructor) {
      match.instructor = { $regex: new RegExp(instructor, "i") };
    }
    if (duration) {
      match.duration = duration;
    }
    if (isActive) {
      match.isActive = isActive === "true";
    }
    if (startDate || endDate) {
      match.createdAt = {};
      if (startDate) {
        match.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        match.createdAt.$lte = new Date(endDate);
      }
    }

    const currentPageInt = parseInt(currentPage, 10);
    const pageSizeInt = parseInt(pageSize, 10);
    const skip = (currentPageInt - 1) * pageSizeInt;

    const pipeline = [
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: pageSizeInt },
      {
        $facet: {
          data: [
            {
              $project: {
                name: 1,
                description: 1,
                duration: 1,
                createdAt: 1,
                level: 1,
                requirements: 1,
                instructor: 1,
                isActive: 1,
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
      {
        $project: {
          data: 1,
          totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        },
      },
    ];

    const result = await Course.aggregate(pipeline);
    const { data, totalCount } = result[0];

    res.status(200).json({
      data,
      totalCount: totalCount || 0,
      message: "Courses fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = searchCourse;
