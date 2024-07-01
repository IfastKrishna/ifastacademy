const handleErrors = require("../../../utils/handleErrors");

const addFollowupMode = async (req, res) => {
  try {
    const { followupMode } = req.body;
    const newFollowupMode = new FollowupMode({
      followupMode,
    });
    await newFollowupMode.save();
    res.status(201).json({ message: "Followup mode added successfully" });
  } catch (error) {
    handleErrors(error, res);
  }
};
