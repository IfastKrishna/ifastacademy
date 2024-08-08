const LeadSourceModal = require("../../../models/master/lead-source.models");
const handleErrors = require("../../../utils/handleErrors");

const getLeadSourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const leadSource = await LeadSourceModal.findOne({ _id: id });
    if (!leadSource) {
      res
        .status(404)
        .send({ success: false, message: "Lead Source not found" });
    }

    res.status(200).send({
      success: true,
      data: leadSource,
      message: "Lead Source fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getLeadSourceById;
