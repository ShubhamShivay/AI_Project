import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./routes/usersRoute.js";
import connectDB from "./config/connectDB.js";
import errorHandler from "./middlewares/errorHandler.js";

//! connect to database
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // for parsing application/json

app.use("/api/users", userRouter);

//! Error handler
app.use(errorHandler);

//! start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
