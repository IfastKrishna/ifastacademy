const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    ifastId: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dzegosfst/image/upload/v1720065923/avatar_25_ixmiwb.jpg",
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },

    phoneNo: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number! Phone number must be 10 digits.`,
      },
    },

    role: {
      type: String,
      required: true,
      enum: ["student", "employee", "admin", "superadmin"],
    },

    dob: {
      type: Date,
    },

    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10; // Adjust salt rounds for security
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      ifastId: this.ifastId,
      email: this.email,
      role: this.role,
      avatar: this.avatar,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
