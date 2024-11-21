import express from "express";
import {
  userRegistration,
  userLogin,
  userLogout,
  getUser,
} from "../controllers/usersCtrl.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const userRouter = express.Router();

//! @desc User registration

//! @route POST /api/user
//! @access Public
userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.get("/profile", isAuthenticated, getUser);


export default userRouter;
