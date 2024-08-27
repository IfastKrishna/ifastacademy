const mongoose = require("mongoose");
const { CourseEnquire } = require("../../models/course-enquire.models");
const { FollowUp } = require("../../models/followup.models");
const handleErrors = require("../../utils/handleErrors");

// Add a new course enquiry
const addCourseEnquire = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      qualification,
      dob,
      gender,
      phoneNo,
      alternativePhoneNo,
      email,
      streetAddress,
      city,
      state,
      postalCode,
      leadSource,
      courseInterest,
      interestLevel,
      followupDetails,
      nextFollowUpDate,
      assignedTo,
      notes,
    } = req.body;

    if (
      !firstName ||
      !qualification ||
      !dob ||
      !gender ||
      !phoneNo ||
      !email ||
      !courseInterest ||
      !interestLevel ||
      !leadSource ||
      !assignedTo
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const address = {
      streetAddress,
      city,
      state,
      postalCode,
      country: "India",
    };

    const courseEnquire = new CourseEnquire({
      firstName,
      lastName,
      qualification,
      dob,
      gender,
      phoneNo,
      alternativePhoneNo,
      email,
      address,
      courseInterest,
      interestLevel,
      leadSource,
    });

    const followUp = new FollowUp({
      leadId: {
        collectionName: "courseenquires",
        id: courseEnquire._id,
      },
      assignedTo: assignedTo,
      dueDate: nextFollowUpDate,
      followupDetails,
      notes,
    });

    await followUp.save();
    await courseEnquire.save();

    res.status(201).json({
      message: "Course enquiry added successfully",
      data: courseEnquire,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

// Delete a course enquiry
const deleteCourseEnquire = async (req, res) => {
  try {
    let { id } = req.params;
    id = JSON.parse(id);

    const deletedCourseEnquire = await CourseEnquire.deleteMany({
      _id: { $in: id },
    });
    const deletedFollowUp = await FollowUp.deleteMany({
      "leadId.id": { $in: id },
      "leadId.collectionName": "courseenquires",
    });

    if (!deletedCourseEnquire.deletedCount) {
      return res.status(404).json({ message: "Course enquiries not found" });
    }

    res.status(200).json({ message: "Course enquiries deleted successfully" });
  } catch (error) {
    handleErrors(error, res);
  }
};

const deleteAllCourseEnquires = async (_, res) => {
  try {
    const deletedCourseEnquires = await CourseEnquire.deleteMany();
    const deletedFollowUps = await FollowUp.deleteMany({
      "leadId.collectionName": "courseenquires",
    });

    if (deletedCourseEnquires.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No course enquiries found to delete" });
    }

    res.status(200).json({
      message: "All course enquiries and their follow-ups deleted successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const updateCourseEnquire = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      qualification,
      dob,
      gender,
      courseInterest,
      leadSource,
      phoneNo,
      alternativePhoneNo,
      email,
      streetAddress,
      city,
      state,
      postalCode,
      enquireDate,
      status,
    } = req.body;

    const address = {
      streetAddress,
      city,
      state,
      postalCode,
      country: "India",
    };

    const courseEnquire = await CourseEnquire.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        qualification,
        dob,
        gender,
        courseInterest,
        leadSource,
        phoneNo,
        alternativePhoneNo,
        email,
        address,
        enquireDate,
        status,
      },
      { new: true }
    );

    if (!courseEnquire) {
      return res.status(404).json({ message: "Course enquiry not found" });
    }

    res.status(200).json({
      message: "Course enquiry updated successfully",
      data: courseEnquire,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

const updateCourseEnquireStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const courseEnquire = await CourseEnquire.findByIdAndUpdate(id, { status });
    if (!courseEnquire) {
      return res.status(404).json({ message: "Course enquiry not found" });
    }
    res.status(200).json({
      message: "Course enquiry status updated successfully",
      data: course,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

const getCourseEnquiresById = async (req, res) => {
  const { id } = req.params;

  try {
    const courseEnquire = await CourseEnquire.findById(id);
    if (!courseEnquire) {
      return res.status(404).json({ message: "Course enquiry not found" });
    }
    res
      .status(200)
      .json({ data: courseEnquire, message: "Course enquiry found" });
  } catch (error) {
    handleErrors(error, res);
  }
};

const getCourseEnquiresCount = async (req, res) => {
  try {
    const courseEnquiresCount = await CourseEnquire.countDocuments();
    res.status(200).json({ count: courseEnquiresCount });
  } catch (error) {
    handleErrors(res, error);
  }
};

module.exports = {
  addCourseEnquire,
  deleteCourseEnquire,
  deleteAllCourseEnquires,
  updateCourseEnquire,
  updateCourseEnquireStatus,
  getCourseEnquiresById,
  getCourseEnquiresCount,
};
