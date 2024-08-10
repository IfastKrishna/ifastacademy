const { FollowUp } = require("../../models/followup.models");
const handleErrors = require("../../utils/handleErrors");

const addFollowup = async (req, res) => {
  const {
    studentId,
    followupDate,
    followupTime,
    followupType,
    followupDetails,
    ...rest
  } = req.body;

  try {
    if (
      !studentId ||
      !followupDate ||
      !followupTime ||
      !followupType ||
      !followupDetails
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields." });
    }

    const followup = new FollowUp({
      studentId,
      followupDate,
      followupTime,
      followupType,
      followupDetails,
      ...rest,
    });

    await followup.save();

    return res.status(201).json({ message: "Followup added successfully" });
  } catch (error) {
    handleErrors(error, res);
  }
};
