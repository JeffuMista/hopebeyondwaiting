const express = require("express");
const User = require("../models/User");
const router = express.Router();

// AUTO CREATE USER FROM CLERK
router.post("/register", async (req, res) => {
  const { userId, name, email } = req.body;
  console.log("REGISTER HIT:", req.body);
  if (!userId || !email) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  // Check if user already exists
  let existing = await User.findOne({ userId });
  if (existing) {
    return res.json(existing);
  }

  // Create new Mongo user
  const newUser = await User.create({
    userId,
    name: name || "",
    nationalId: "",
    phone: "",
    role: "user",
  });

  res.status(201).json(newUser);
});

module.exports = router;
