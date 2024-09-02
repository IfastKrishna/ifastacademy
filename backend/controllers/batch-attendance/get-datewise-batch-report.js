const mongoose = require("mongoose");
const BatchAttendance = require("../../models/batch-attendance");
const handleErrors = require("../../utils/handleErrors");

const getBatchAttendanceByDateAndId = async (req, res) => {
  // console.log("batchId recvied and date", batchId, date);
  try {
    let { batchId, date } = req.query;

    if (!batchId || !date) {
      return res
        .status(400)
        .json({ message: "Please provide batchId and date" });
    }
    const attendance = await BatchAttendance.findOne({
      batchId,
      date,
    })
      .populate("batchId", "name")
      .populate("takenBy", "firstName lastName ifastId")
      .populate({
        path: "studentsAttendance.studentId",
        select: "ifastId firstName lastName phoneNo",
      });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    // const attendance = await BatchAttendance.aggregate([
    //   {
    //     $match: {
    //       batchId: new mongoose.Types.ObjectId(batchId),
    //       date: new Date(date),
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "batches", // Collection to join
    //       localField: "batchId",
    //       foreignField: "_id",
    //       as: "batchDetails",
    //     },
    //   },
    //   { $unwind: "$batchDetails" },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "takenBy",
    //       foreignField: "_id",
    //       as: "userDetails",
    //     },
    //   },
    //   { $unwind: "$userDetails" },
    //   {
    //     $lookup: {
    //       from: "students",
    //       localField: "studentsAttendance.studentId",
    //       foreignField: "_id",
    //       as: "studentDetails",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$studentsAttendance",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $addFields: {
    //       "studentsAttendance.studentDetails": {
    //         $arrayElemAt: [
    //           "$studentDetails",
    //           {
    //             $indexOfArray: [
    //               "$studentDetails._id",
    //               "$studentsAttendance.studentId",
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       "batchDetails.name": 1,
    //       "userDetails.firstName": 1,
    //       "userDetails.lastName": 1,
    //       "userDetails.ifastId": 1,
    //       date: 1,
    //       todayTopic: 1,
    //       problemFaced: 1,
    //       generalRemarks: 1,
    //       "studentsAttendance.studentDetails.ifastId": 1,
    //       "studentsAttendance.studentDetails.firstName": 1,
    //       "studentsAttendance.studentDetails.lastName": 1,
    //       "studentsAttendance.studentDetails.phoneNo": 1,
    //       "studentsAttendance.status": 1,
    //       "studentsAttendance.remarks": 1,
    //     },
    //   },
    // ]);

    return res.status(200).json({ success: true, data: attendance });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = getBatchAttendanceByDateAndId;
