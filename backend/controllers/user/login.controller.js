const User = require("../../models/user.models");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }, { ifastId: email }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const loggedInUser = await User.findOne({ _id: user._id }).select(
      "-password"
    );

    const token = user.generateAccessToken();

    res
      .status(200)
      .cookie(process.env.TOKEN_NAME, token, {
        httpOnly: true,
        secure: true,
      })
      .send({
        success: true,
        message: "Login successful",
        data: loggedInUser,
        token,
        isAuth: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = login;
