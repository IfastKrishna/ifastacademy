const mongoose = require("mongoose");
const { FollowUp } = require("../../models/followup.models");
const handleErrors = require("../../utils/handleErrors");

// Delete a follow-up
const deleteFollowUp = async (req, res) => {
  try {
    let { id } = req.params;
    id = JSON.parse(id);

    const deleteFollowup = await FollowUp.deleteMany({ _id: { $in: id } });

    if (deleteFollowup.deletedCount === 0) {
      return res.status(404).json({ message: "Follow-up not found" });
    }

    res.status(200).json({ message: "Follow-up deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the follow-up",
      error,
    });
  }
};

const addFollowUp = async (req, res) => {
  try {
    const { leadId, assignedTo, dueDate, followupDetails, notes } = req.body;

    if (!leadId || !assignedTo || !dueDate || !followupDetails) {
      return res.status(400).json({
        message: "Please provide leadId, assignedTo, dueDate, and description",
      });
    }

    const followUp = await FollowUp.create({
      leadId,
      assignedTo,
      dueDate,
      followupDetails,
      notes,
    });

    res.status(201).json({
      message: "Follow-up added successfully",
      data: followUp,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const updateFollowUp = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo, dueDate, followupDetails, notes, status } = req.body;

    if (!assignedTo || !dueDate || !followupDetails) {
      return res.status(400).json({
        message: "Please provide leadId, assignedTo, dueDate, and description",
      });
    }

    const updatedFollowUp = await FollowUp.findByIdAndUpdate(
      id,
      {
        assignedTo,
        dueDate,
        followupDetails,
        notes,
        status,
      },
      {
        new: true,
      }
    );

    if (!updatedFollowUp) {
      return res.status(404).json({ message: "Follow-up not found" });
    }

    res.status(200).json({
      message: "Follow-up updated successfully",
      data: updatedFollowUp,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

// Reschedule a follow-up
const rescheduleFollowUp = async (req, res) => {
  try {
    const { id } = req.params;
    const { dueDate } = req.body;

    if (!dueDate) {
      return res.status(400).json({ message: "New due date must be provided" });
    }

    const updatedFollowUp = await FollowUp.findByIdAndUpdate(
      id,
      { dueDate },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedFollowUp) {
      return res.status(404).json({ message: "Follow-up not found" });
    }

    res.status(200).json({
      message: "Follow-up rescheduled successfully",
      data: updatedFollowUp,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

// Get all follow-ups
const getAllFollowUpsByCollectionOrId = async (req, res) => {
  const { id, collectionName } = req.query;
  try {
    const followUps = await FollowUp.find({
      leadId: {
        id,
        collectionName,
      },
    }).populate("assignedTo");

    res
      .status(200)
      .json({ message: "Follow-ups retrieved successfully", data: followUps });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving follow-ups",
      error,
    });
  }
};

const deleteAllFollowUps = async (req, res) => {
  try {
    await FollowUp.deleteMany();

    res.status(200).json({ message: "All follow-ups deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting all follow-ups",
      error,
    });
  }
};

const getFollowupById = async (req, res) => {
  try {
    const { id } = req.params;

    const followUp = await FollowUp.findById(id);

    if (!followUp) {
      return res.status(404).json({ message: "Follow-up not found" });
    }

    res.status(200).json({
      message: "Follow-up retrieved successfully",
      data: followUp,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = {
  deleteFollowUp,
  rescheduleFollowUp,
  addFollowUp,
  deleteAllFollowUps,
  getAllFollowUpsByCollectionOrId,
  getFollowupById,
  updateFollowUp,
};
