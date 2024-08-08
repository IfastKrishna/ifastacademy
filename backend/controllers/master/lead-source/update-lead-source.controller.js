const LeadSourceModal = require("../../../models/master/lead-source.models");
const handleErrors = require("../../../utils/handleErrors");

const updateLeadSource = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const { name, description, contact, isActive } = req.body;
    if (!name || !contact) {
      return res.status(400).json({ message: "Name or contact are required" });
    }
    const leadSource = await LeadSourceModal.findByIdAndUpdate(
      id,
      {
        name,
        description,
        contact,
        isActive,
      },
      { new: true }
    );
    if (!leadSource) {
      return res
        .status(404)
        .json({ message: `Lead Source with id ${id} not found` });
    }
    res
      .status(200)
      .send({ status: true, message: "Lead Source updated successfully" });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = updateLeadSource;
