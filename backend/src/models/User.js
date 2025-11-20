const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    UserId: { type: String, index: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    nationalId: { type: Number, required: true },
    role: {
      type: String,
      enum: ["patient", "center-admin"],
      default: "patient",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
