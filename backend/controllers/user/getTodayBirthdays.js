const moment = require("moment");
const User = require("../../models/user.models");
const handleErrors = require("../../utils/handleErrors");

const countUsersWithBirthdayToday = async (req, res) => {
  try {
    // Get today's date without time using moment.js
    const today = moment().startOf("day");
    const tomorrow = moment(today).add(1, "days");

    // Query the database for users with a birthday today
    const count = await User.countDocuments({
      dob: {
        $gte: today.toDate(),
        $lt: tomorrow.toDate(),
      },
    });

    // Send the count back as a response
    res.status(200).json({
      success: true,
      count,
    });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = countUsersWithBirthdayToday;
