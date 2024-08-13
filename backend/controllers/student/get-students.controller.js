const { Student } = require("../../models/student/student.models");
const handleErrors = require("../../utils/handleErrors");

const getAllStudents = async (req, res) => {
  let { page = 1, pageSize = 5, search = "" } = req.query;
  try {
    const skip = (parseInt(page) - 1) * parseInt(pageSize); // Corrected skip calculation
    const limit = parseInt(pageSize);
    const query = {
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { emergencyContact: { $regex: search, $options: "i" } },
        { ifastId: { $regex: search, $options: "i" } },
      ],
    };

    // Execute the queries
    const [students, count] = await Promise.all([
      Student.find(query)
        .skip(skip)
        .limit(limit)
        .populate({
          path: "enrolledBatch",
          select: "name", // Specify fields to include from the Batch schema
          populate: {
            path: "course", // If Batch references Course
            select: "name", // Specify fields to include from the Course schema
          },
        }),
      Student.countDocuments(query),
    ]);

    // Send the response
    res.status(200).json({ success: true, data: students, count });
  } catch (error) {
    console.log("Error in getAllStudents:", error);
    handleErrors(error, res);
  }
};

module.exports = getAllStudents;
