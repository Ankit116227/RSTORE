import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    couponCode: {
      type: String,
      default: "",
      uppercase: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Offer =
  mongoose.models.Offer ||
  mongoose.model("Offer", offerSchema);

export default Offer;