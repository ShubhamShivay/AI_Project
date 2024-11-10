import express from "express";
import {
  userRegistration,
  userLogin,
  userLogout,
} from "../controllers/usersCtrl.js";

const userRouter = express.Router();

//! @desc User registration

//! @route POST /api/user
//! @access Public
userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);

export default userRouter;
