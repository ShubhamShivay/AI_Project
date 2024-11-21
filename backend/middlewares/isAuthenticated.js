import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
//?--------------------------------
//! @desc Check if user is logged in
//! @route GET /api/users/me
//! @access Private
//?--------------------------------

const isAuthenticated = asyncHandler(async (req, res, next) => {
  if (req.cookies?.jwt) {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    // console.log(decoded);
    // console.log(req.user);
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, no token, please log in");
  }
});

export default isAuthenticated;
