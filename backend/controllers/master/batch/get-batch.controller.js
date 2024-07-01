const { Batch } = require("../../../models/master/batch.models");
const handleErrors = require("../../../utils/handleErrors");

const getAllBatches = async (req, res) => {
  try {
    const filters = req.query;
    const { page = 1, pageSize = 10 } = req.query;
    const skip = (page - 1) * pageSize;

    const [batches, totalBatches] = await Promise.all([
      Batch.aggregate([
        { $match: filters },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: pageSize },
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "course",
          },
        },
        { $unwind: "$course" },
        {
          $lookup: {
            from: "instructors",
            localField: "instructor",
            foreignField: "_id",
            as: "instructor",
          },
        },
        { $unwind: "$instructor" },
        {
          $lookup: {
            from: "students",
            localField: "students",
            foreignField: "_id",
            as: "students",
          },
        },
        { $unwind: "$students" },
      ]),
      Batch.aggregate([{ $match: filters }, { $count: "totalBatches" }]),
    ]);

    const totalBatchesCount =
      totalBatches.length > 0 ? totalBatches[0].totalBatches : 0;

    res.status(200).json({
      data: batches,
      totalCount: totalBatchesCount,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages: Math.ceil(totalBatchesCount / pageSize),
      },
    });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = getAllBatches;
