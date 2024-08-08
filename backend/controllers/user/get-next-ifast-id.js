const User = require("../../models/user.models");

const getNextIfastId = async (_, res) => {
  try {
    const highestUser = await User.findOne().sort({ ifastId: -1 }).exec();

    if (!highestUser) {
      return "IFAST/2024/0001";
    }

    const highestIfastId = highestUser.ifastId;
    const highestNumber = parseInt(highestIfastId.split("/").pop(), 10);

    const nextNumber = highestNumber + 1;

    let padding = "";
    if (nextNumber < 10) {
      padding = "000";
    } else if (nextNumber < 100) {
      padding = "00";
    } else if (nextNumber < 1000) {
      padding = "0";
    }

    const nextIfastId = `IFAST/2024/${padding}${nextNumber}`;
    res.send(nextIfastId);
  } catch (error) {
    console.log("Error in getting next IFAST ID", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { getNextIfastId };
