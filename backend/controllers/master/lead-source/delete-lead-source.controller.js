const LeadSourceModal = require("../../../models/master/lead-source.models");
const handleErrors = require("../../../utils/handleErrors");

const deleteLeadSource = async (req, res) => {
  try {
    let { id } = req.params;
    id = JSON.parse(id);
    if (Array.isArray(id)) {
      const leadSource = await LeadSourceModal.deleteMany({ _id: { $in: id } });
      if (!leadSource.deletedCount) {
        return res
          .status(404)
          .json({ message: `Lead Source with ids ${id} not found` });
      }
      return res.json({
        message: `Lead Sources with ids ${id} deleted successfully`,
      });
    } else {
      const leadSource = await LeadSource.findByIdAndDelete(id);
      if (!leadSource) {
        return res
          .status(404)
          .json({ message: `Lead Source with id ${id} not found` });
      }
      return res.json({
        message: `Lead Source with id ${id} deleted successfully`,
      });
    }
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = deleteLeadSource;
