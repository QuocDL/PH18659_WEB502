import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: String,
    description: String,
    categoryID: {
      default: "656e3aa3ae10915ef8fe665f",
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", productSchema);
