const addFollowupMode = async (req, res) => {
  try {
    const { followupMode } = req.body;
    const newFollowupMode = new FollowupMode({
      followupMode,
    });
    await newFollowupMode.save();
    res.status(201).json({ message: "Followup mode added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
