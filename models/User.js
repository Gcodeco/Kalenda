import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  creatdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
