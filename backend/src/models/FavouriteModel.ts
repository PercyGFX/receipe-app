import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema({
  receipeId: {
    type: String,
    required: true,
    unique: true,
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

  // user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models["favourite"] ||
  mongoose.model("favourite", FavouriteSchema);
