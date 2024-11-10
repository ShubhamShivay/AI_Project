import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    monthlyRequestCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//? create model
const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
