const handleErrors = (err, res) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Something went wrong!" });
};

module.exports = handleErrors;
