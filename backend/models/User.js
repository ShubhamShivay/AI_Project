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
      default: "Trial",
      enum: ["Trial", "Free", "Basic", "Standard", "Premium"],
    },
    apiRequestCount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      default: 100, // TODO 100 requests per month // 3 days trial
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//! Add the virtual property
userSchema.virtual("isTrialActive").get(function () {
  let isTrialActive = this.trialActive && new Date() < this.trialExpire;
  console.log("trialExpire", this.trialExpire);
  console.log("isTrialActive", isTrialActive);
  return isTrialActive;
});

//? Compile to create model
const User = mongoose.model("User", userSchema);

export default User;
