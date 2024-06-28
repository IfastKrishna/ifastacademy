const User = require("../../models/user.models");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [{ username }, { email: username }, { phoneNo: username }],
    }).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = user.generateAccessToken();
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .send({
        success: true,
        message: "Login successful",
        user,
        token,
        isAuth: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = login;
