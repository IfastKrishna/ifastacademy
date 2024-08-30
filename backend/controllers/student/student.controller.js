const BatchAttendance = require("../../models/batch-attendance");
const StudentFee = require("../../models/student/student-fee");
const { Student } = require("../../models/student/student.models");
const handleErrors = require("../../utils/handleErrors");
const mongoose = require("mongoose");

const getStudentBatches = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId)
      .select("enrolledBatch")
      .populate({
        path: "enrolledBatch",
        populate: {
          path: "course",
        },
      })
      .exec();

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const count = student.enrolledBatch.length;

    res.status(200).json({
      message: "Student batches fetched successfully",
      data: student.enrolledBatch,
      count,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const getStudentPaidFees = async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await StudentFee.aggregate([
      {
        $match: { studentId: new mongoose.Types.ObjectId(studentId) },
      },
      {
        $group: {
          _id: "$studentId",
          totalPaid: { $sum: "$amount" }, // Sum the amount field for totalPaid
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          totalPaid: 1, // Include the totalPaid field
        },
      },
    ]);

    const totalPaid = result.length > 0 ? result[0].totalPaid : 0;

    res.status(200).json({
      message: "Total paid fees fetched successfully",
      totalPaid,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const getStudentUnpaidFees = async (req, res) => {
  const { studentId } = req.params;
  try {
    // Fetch the student information
    const student = await Student.findById(studentId).populate("enrolledBatch");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { joiningDate, enrolledBatch } = student;
    const monthlyFee = enrolledBatch.monthlyFee;

    // Calculate the number of months from joiningDate till the current month
    const currentDate = new Date();
    const startMonth = joiningDate.getMonth() + 1; // Month after joining
    const startYear = joiningDate.getFullYear();
    const endMonth = currentDate.getMonth(); // Current month
    const endYear = currentDate.getFullYear();

    let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth + 1);

    // Calculate the total expected fees
    const totalExpectedFees = totalMonths * monthlyFee;

    // Calculate the total paid fees
    const result = await StudentFee.aggregate([
      {
        $match: { studentId: mongoose.Types.ObjectId(studentId) },
      },
      {
        $group: {
          _id: "$studentId",
          totalPaid: { $sum: "$amount" },
        },
      },
    ]);

    const totalPaid = result.length > 0 ? result[0].totalPaid : 0;

    // Calculate the total unpaid fees
    const totalUnpaid = totalExpectedFees - totalPaid;

    res.status(200).json({
      message: "Total unpaid fees calculated successfully",
      totalUnpaid,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const getTotalAbsentDaysBatchWise = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId)
      .select("enrolledBatch")
      .populate({
        path: "enrolledBatch",
        select: "batchName batchStartDate batchEndDate monthlyFee", // select the batch details you want to include
      });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { enrolledBatch } = student;

    const results = await Promise.all(
      enrolledBatch.map(async (batch) => {
        const result = await BatchAttendance.aggregate([
          {
            $match: { batchId: new mongoose.Types.ObjectId(batch._id) },
          },
          {
            $unwind: "$studentsAttendance",
          },
          {
            $match: {
              "studentsAttendance.studentId": new mongoose.Types.ObjectId(
                studentId
              ),
              "studentsAttendance.status": "absent",
            },
          },
          {
            $count: "totalAbsentDays",
          },
        ]);

        const totalAbsentDays =
          result.length > 0 ? result[0].totalAbsentDays : 0;

        return {
          batchInfo: batch, // Include the entire batch object
          totalAbsentDays,
        };
      })
    );

    res.status(200).json({
      message: "Batch information with total absent days fetched successfully",
      data: results,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const getStudentCurrMonthAttendance = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId)
      .select("enrolledBatch")
      .populate("enrolledBatch", "batchId batchName");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { enrolledBatch } = student;

    // Get the current month and year
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-based index (0 = January, 11 = December)
    const currentYear = now.getFullYear();

    const results = await Promise.all(
      enrolledBatch.map(async (batch) => {
        const result = await BatchAttendance.aggregate([
          {
            $match: {
              batchId: new mongoose.Types.ObjectId(batch._id),
              year: currentYear,
              month: currentMonth + 1, // MongoDB stores months from 1 to 12, so add 1
            },
          },
          {
            $unwind: "$studentsAttendance",
          },
          {
            $match: {
              "studentsAttendance.studentId": new mongoose.Types.ObjectId(
                studentId
              ),
            },
          },
          {
            $project: {
              _id: 0,
              date: "$date",
              status: "$studentsAttendance.status",
            },
          },
        ]);

        return {
          batchInfo: batch,
          attendance: result, // Include the student's attendance for the current month
        };
      })
    );

    res.status(200).json({
      message: "Current month attendance fetched successfully",
      data: results,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const getStudentAttendanceReport = async (req, res) => {
  // Implementation needed
};

module.exports = {
  getStudentBatches,
  getStudentPaidFees,
  getStudentUnpaidFees,
  getTotalAbsentDaysBatchWise,
  getStudentCurrMonthAttendance,
  getStudentAttendanceReport,
};
