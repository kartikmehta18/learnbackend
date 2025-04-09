import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      types: Schema.Types.ObjectId,
      // subscribing
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timpestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
