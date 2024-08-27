const { CourseEnquire } = require("../../models/course-enquire.models");
const { FollowUp } = require("../../models/followup.models");
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
      enquiryId,
      ...rest
    } = req.body;

    const address = {
      city: rest?.city || "",
      state: rest?.state || "",
      country: "India",
      postalCode: rest?.postalCode || "",
      streetAddress: rest?.streetAddress || "",
    };

    const { ifastId, avatar, _id: userId } = req?.user;

    // Check for missing required fields
    if (
      ![firstName, email, phoneNo, joiningDate, dob, enrolledBatch].every(
        (field) => field
      )
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Check if the student already exists
    const studentExists = await Student.findOne({ email, ifastId });
    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Create the student
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

    // Handle enquiry and follow-up deletion if enquiryId is provided
    if (enquiryId) {
      await Promise.all([
        CourseEnquire.deleteOne({ _id: enquiryId }),
        FollowUp.deleteMany({
          "leadId.collectionName": "courseenquires",
          "leadId.id": enquiryId,
        }),
      ]);
    }

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
