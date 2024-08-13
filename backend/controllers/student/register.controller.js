const { Student } = require("../../models/student/student.models");
const handleErrors = require("../../utils/handleErrors");

const addStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      enrolledBatch,
      joiningDate,
      dob,
      role,
      ...rest
    } = req.body;

    const address = {
      city: rest?.city,
      state: rest?.state,
      country: "India",
      postalCode: rest?.postalCode,
      streetAddress: rest?.streetAddress,
    };

    const { ifastId, avatar, _id: userId } = req?.user;

    if (
      [
        firstName,
        email,
        phoneNo,
        joiningDate,
        dob,
        address,
        enrolledBatch,
      ].some(
        (field) =>
          !field || field === "" || field === null || field === undefined
      )
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const studentExists = await Student.findOne({ email, ifastId });

    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = await Student.create({
      firstName,
      lastName,
      userId,
      ifastId,
      avatar,
      email,
      phoneNo,
      enrolledBatch,
      address,
      joiningDate,
      dob,
      role,
    });

    res.json({
      success: true,
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = addStudent;
