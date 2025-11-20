const express = require("express");
const User = require("../models/User");
const router = express.Router();

// GET all Users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//POST api/notes => create new entry - Optionally add Id
router.post("/", async (req, res) => {
  const { name, phone, nationalId } = req.body;

  if (!name || !phone || !nationalId)
    return res
      .status(400)
      .json({ message: "Please enter the required details." });

  const user = await User.create({ name, phone, nationalId });
  res.status(201).json(user);
});

//PUT api/users/:id Update existing entry
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, nationalId, userId } = req.body;
  const updated = await User.findByIdAndUpdate(
    id,
    { $set: { name, phone, nationalId, userId } },
    { new: true }
  );
  if (!updated)
    return res.status(404).json({ message: "There is nothing to update" });
  res.json(updated);
});

//DELETE api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
