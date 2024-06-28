const addCourseEnquire = async (req, res) => {
  const { firstName, lastName, email, phoneNo, course, message } = req.body;

  if (!firstName || !lastName || !ifastId || !email || !phoneNo || !course) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newCourseEnquire = new CourseEnquire({
      firstName,
      lastName,
      email,
      phoneNo,
      course,
      message,
    });

    await newCourseEnquire.save();

    res.status(201).json({ message: "Course enquire added successfully" });
  } catch (error) {
    console.log("Add course enquire error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
