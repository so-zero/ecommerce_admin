import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    media: [String],
    category: String,
    banners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Banner",
      },
    ],
    tags: [String],
    sizes: [String],
    colors: [String],
    price: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v: mongoose.Schema.Types.Decimal128) => {
        return parseFloat(v.toString());
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
