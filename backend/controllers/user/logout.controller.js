const logout = async (req, res) => {
  res
    .status(200)
    .cookie(process.env.TOKEN_NAME, null, { expires: new Date(Date.now()) })
    .clearCookie(process.env.TOKEN_NAME)
    .send({
      success: true,
      message: "Logout successful",
      isAuth: false,
    });
};

module.exports = logout;
