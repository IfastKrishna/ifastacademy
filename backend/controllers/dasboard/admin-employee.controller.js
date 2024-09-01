const { FollowUp } = require("../../models/followup.models");
const { Batch } = require("../../models/master/batch.models");
const { Employee } = require("../../models/master/employee.models");
const StudentFee = require("../../models/student/student-fee");
const { Student } = require("../../models/student/student.models");
const handleErrors = require("../../utils/handleErrors");
const mongoose = require("mongoose");

const totalCollectedFeesByRange = async (req, res) => {
  const { role, _id: id } = req.user;

  try {
    const { startDate, endDate } = req.query;

    // Set default date range to the current month if not provided
    const start = startDate
      ? new Date(startDate)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate
      ? new Date(endDate)
      : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    let feeQuery = {
      paymentDate: { $gte: start, $lte: end },
    };

    if (role == "employee") {
      // Filter by the fees collected by this employee
      feeQuery.collectedBy = id;
    }

    // Aggregate the fees within the date range
    const totalFees = await StudentFee.aggregate([
      { $match: feeQuery },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          fees: { $push: "$$ROOT" },
        },
      },
    ]);

    const result = totalFees[0] || { totalAmount: 0, fees: [] };

    res.status(200).json({
      message: "fetch data successfully",
      total: result.totalAmount,
      data: result.fees,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const todayCollectedFees = async (req, res) => {
  try {
    const { role, _id: id } = req.user;

    // Set the date range for today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    let feeQuery = {
      paymentDate: { $gte: todayStart, $lte: todayEnd },
    };

    if (role === "employee") {
      // Filter by the fees collected by this employee
      feeQuery.collectedBy = id;
    }

    // Aggregate the fees collected today
    const todayFees = await StudentFee.aggregate([
      { $match: feeQuery },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          fees: { $push: "$$ROOT" },
        },
      },
    ]);

    // console.log(todayFees, "todayFees");

    const result = todayFees[0] || { totalAmount: 0, fees: [] };

    res.status(200).json({
      message: "fetch data successfully",
      total: result.totalAmount,
      data: result.fees,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const myTotalExpense = async (req, res) => {
  console.log(req.user, "myTotalExpense");
  try {
  } catch (error) {
    handleErrors(error, res);
  }
};

  

const myIncome = async (req, res) => {
  const { _id } = req.user;
  // console.log(req.user, "myIncome");
  try {
    const employee = await Employee.findOne({ userId: _id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    let income = 0;

    if (employee.baseOnSalary === "monthly") {
      income = employee.salary;
    } else if (employee.baseOnSalary === "per-student(%)") {
      const totalCollectedFees = await StudentFee.aggregate([
        { $match: { batchId: { $in: employee.batchIds } } },
        { $group: { _id: null, totalFees: { $sum: "$amount" } } },
      ]);

      if (totalCollectedFees.length > 0) {
        const totalFees = totalCollectedFees[0].totalFees;
        income = (totalFees * employee.salary) / 100;
      }
    }

    res.status(200).json({ message: "fetch data successfully", data: income });
  } catch (error) {
    handleErrors(error, res);
  }
};

const totalDropoutsStudents = async (req, res) => {
  //   console.log(req.user, "totalDropoutsStudents");
  try {
    const { role, id } = req.user; // Assuming req.user contains the user's role and id
    const { startDate, endDate } = req.query;

    // If startDate and endDate are provided, use them; otherwise, use the current month's date range
    const start = startDate
      ? new Date(startDate)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate
      ? new Date(endDate)
      : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

    let totalDropouts = 0;
    let dropoutStudents = [];

    if (role === "employee") {
      // Find the employee by user ID
      const employee = await Employee.findOne({ userId: id }).populate(
        "batchIds"
      );

      // Check if employee exists
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }

      // Get all batch IDs assigned to the employee
      const batchIds = employee.batchIds.map((batch) => batch._id);

      // Find all students with status "Dropout" within the specified date range in the employee's batches
      dropoutStudents = await Student.find({
        enrolledBatch: { $in: batchIds },
        status: "Dropout",
        updatedAt: { $gte: start, $lt: end }, // Assuming dropout status change is reflected in `updatedAt`
      });

      totalDropouts = dropoutStudents.length;
    } else {
      // Find all students with status "Dropout" within the specified date range across all batches
      dropoutStudents = await Student.find({
        status: "Dropout",
        updatedAt: { $gte: start, $lt: end }, // Assuming dropout status change is reflected in `updatedAt`
      });

      totalDropouts = dropoutStudents.length;
    }

    res.status(200).json({
      message: "fetch data successfully",
      count: totalDropouts,
      data: dropoutStudents,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const myTotalBatch = async (req, res) => {
  //   console.log(req.user, "myTotalBatch");
  try {
    const { role, id } = req.user;
    let totalBatches = 0;
    let batches = [];

    if (role === "employee") {
      const employee = await Employee.findOne({ userId: id }).populate(
        "batchIds"
      );

      // Check if employee exists
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }

      // Get all batch IDs assigned to the employee
      batches = await Batch.find({ _id: { $in: employee.batchIds } }).populate(
        "course"
      );

      totalBatches = batches.length;
    } else {
      // Get all batches for non-employees
      batches = await Batch.find({}).populate("course");
      totalBatches = batches.length;
    }

    res.status(200).json({
      message: "fetched Data successfully",
      count: totalBatches,
      data: batches,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const todayAdmission = async (req, res) => {
  //   console.log(req?.query);
  try {
    const { role, id } = req?.query;

    // Get today's start and end dates
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Set to start of the day

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // Set to end of the day

    let totalAdmissions = 0;
    let students = [];

    if (role === "employee") {
      // Find the employee by user ID
      const employee = await Employee.findOne({ _id: id }).populate("batchIds");

      // Check if employee exists
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }

      // Get all batch IDs assigned to the employee
      const batchIds = employee.batchIds.map((batch) => batch._id);

      // Find all students who joined today in the employee's batches
      students = await Student.find({
        enrolledBatch: { $in: batchIds },
        joiningDate: { $gte: todayStart, $lt: todayEnd },
      });

      totalAdmissions = students.length;
    } else {
      // Find all students who joined today across all batches
      students = await Student.find({
        joiningDate: { $gte: todayStart, $lt: todayEnd },
      });

      totalAdmissions = students.length;
    }

    res.status(200).json({
      message: "fetched student Today",
      count: totalAdmissions,
      data: students,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const totalAdmissionInThisMonth = async (req, res) => {
  //   console.log(req?.query);
  try {
    const { role, id, startDate, endDate } = req?.query;

    // If startDate and endDate are provided, use them; otherwise, use the current month's date range
    const start = startDate
      ? new Date(startDate)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate
      ? new Date(endDate)
      : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

    let totalAdmissions = 0;
    let students = [];

    if (role === "employee") {
      // Find the employee by user ID
      const employee = await Employee.findOne({ _id: id }).populate("batchIds");

      // Check if employee exists
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }

      // Get all batch IDs assigned to the employee
      const batchIds = employee.batchIds.map((batch) => batch._id);

      // Find all students who joined in the specified date range in the employee's batches
      students = await Student.find({
        enrolledBatch: { $in: batchIds },
        joiningDate: { $gte: start, $lt: end },
      });

      totalAdmissions = students.length;
    } else {
      // Find all students who joined in the specified date range across all batches
      students = await Student.find({
        joiningDate: { $gte: start, $lt: end },
      });

      totalAdmissions = students.length;
    }

    res.status(200).json({
      message: "fetched data successfully",
      count: totalAdmissions,
      data: students,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const todayFollowUp = async (req, res) => {
  //   console.log(req.user, "todayFollowUp");
  try {
    const { role, id } = req.user;

    // Get today's date range (start and end of the day)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    let followUpsQuery = {};

    if (role === "employee") {
      // Filter follow-ups assigned to this user and scheduled for today
      followUpsQuery = {
        assignedTo: id,
        dueDate: { $gte: todayStart, $lt: todayEnd },
      };
    } else {
      // Filter all follow-ups scheduled for today
      followUpsQuery = {
        dueDate: { $gte: todayStart, $lt: todayEnd },
      };
    }

    // Fetch follow-ups
    const followUps = await FollowUp.find(followUpsQuery).populate({
      path: "assignedTo",
      select: "firstName lastName ifastId avatar",
    });

    // Populate leadDetails
    const populatedFollowUps = await Promise.all(
      followUps.map(async (followup) => {
        if (followup?.leadId?.collectionName) {
          const leadCollection = mongoose.connection.collection(
            followup?.leadId?.collectionName
          );
          const leadDetails = await leadCollection.findOne({
            _id: followup?.leadId?.id,
          });

          followup = followup.toObject();
          followup.leadDetails = leadDetails;
        }
        return followup;
      })
    );

    const totalFollowUps = populatedFollowUps.length;

    res.status(200).json({
      message: "Fetched data successfully",
      count: totalFollowUps,
      data: populatedFollowUps,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = {
  totalCollectedFeesByRange,
  todayCollectedFees,
  myTotalExpense,
  myIncome,
  totalDropoutsStudents,
  myTotalBatch,
  todayAdmission,
  totalAdmissionInThisMonth,
  todayFollowUp,
};
