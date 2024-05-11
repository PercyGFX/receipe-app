import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema({
  receipeId: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Make the combination of receipeId and user unique
FavouriteSchema.index({ receipeId: 1, user: 1 }, { unique: true });

export default mongoose.models["favourite"] ||
  mongoose.model("favourite", FavouriteSchema);