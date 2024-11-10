import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    mName: {
      type: String,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    trialPeriod: {
      type: Number,
      default: 3, // 3 days
    },
    trialActive: {
      type: Boolean,
      default: true,
    },
    trialExpire: {
      type: Date,
    },
    subscription: {
      type: String,
      default: "Free",
      enum: ["Trial", "Free", "Basic", "Standard", "Premium"],
    },
    apiRequestCount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      default: 0,
    },
    nextBillingDate: {
      type: Date,
    },
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "History",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//? Compile to create model
const User = mongoose.model("User", userSchema);

export default User;
