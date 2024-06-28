const { Student } = require("../../models/student.models");

const registerStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      fatherName,
      motherName,
      email,
      phoneNo,
      enrolledCourses,
      address,
      joiningDate,
      dob,
      role,
    } = req.body;

    const { ifastId, avatar, _id: userId } = req?.user;

    if (
      [firstName, email, phoneNo, joiningDate, dob].some(
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
      fatherName,
      motherName,
      userId,
      ifastId,
      avatar,
      email,
      phoneNo,
      enrolledCourses,
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
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
