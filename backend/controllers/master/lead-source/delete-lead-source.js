const { LeadSource } = require("../../../models/master/lead-source.models");

const deleteLeadSource = async (req, res) => {
  try {
    let { id } = req.params;
    // Parse id if it's a stringified JSON
    id = JSON.parse(id);

    if (Array.isArray(id)) {
      // Deleting multiple lead sources
      const leadSource = await LeadSource.deleteMany({ _id: { $in: id } });
      if (!leadSource.deletedCount) {
        return res
          .status(404)
          .json({ message: `Lead Source with ids ${id} not found` });
      }
      return res.json({
        message: `Lead Sources with ids ${id} deleted successfully`,
      });
    } else {
      // Deleting a single lead source
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
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteLeadSource;
