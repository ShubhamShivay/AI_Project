import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

//? -------------------------------
//! @desc User registration
//! @route POST /api/user
//! @access Public
//? -------------------------------

export const userRegistration = asyncHandler(async (req, res) => {
  let { fName, mName, lName, email, password } = req.body;

  // ! Capitalize first letter
  fName = capitalizeFirstLetter(fName);
  mName = capitalizeFirstLetter(mName);
  lName = capitalizeFirstLetter(lName);

  // ! Validate user input
  if (!fName || !mName || !lName || !email || !password) {
    res.status(400);
    // res.send("Please add all fields");
    throw new Error("Please add all fields");
  }

  // ! Check if user already exists
  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // ! Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    fName: fName.toLowerCase(),
    mName: mName.toLowerCase(),
    lName: lName.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
  });
  // ! Add the date the trial will end
  user.trialExpire = new Date(
    new Date().getTime() + user.trialPeriod * 24 * 60 * 60 * 1000
  );

  res.json({
    status: "success",
    message: "User registration successful",
    data: user,
    trialExpires: user.trialPeriod,
  });
});

//? -------------------------------
//! @desc User login
//! @route POST /api/user/login
//! @access Public
//? -------------------------------

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // ! Validate user input
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // ! Check if user exists

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );
  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  // ! Check if password is correct

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  // ! Create token

  const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
    expiresIn: "3d", // ? Token expires in 3 days
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  // ! Add the date the trial will end

  if (user.trialActive) {
    user.trialExpire = new Date(
      new Date().getTime() + user.trialPeriod * 24 * 60 * 60 * 1000
    );
    0;
  }

  // console.log(user.trialExpire);
  // ! Send response

  res.json({
    status: "success",
    message: "User login successful",
    data: user,
    token,
  });
});

//? -------------------------------
//! @desc User logout
//! @route POST /api/user/logout
//! @access Private
//? -------------------------------

export const userLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 0,
  });

  res.status(200).json({
    status: "success",
    message: "User logout successful",
  });
});

//? -------------------------------
//! @desc Get user
//! @route GET /api/user/me
//! @access Private
//? -------------------------------

export const getUser = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const user = await User.findById(id).select("-password");

  // ! if user does not exist
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    status: "success",
    message: "User retrieved successfully",
    user,
  });
});
