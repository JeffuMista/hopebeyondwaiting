const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

//GET all Bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

//POST api/Bookings => Create a new Booking
router.post("/", async (req, res) => {
  const { user, center, slot, status, urgencyLevel } = req.body;

  if (!user || !center || !slot || !status || urgencyLevel)
    return res
      .status(400)
      .json({ message: "Please enter the required details." });

  const booking = await Booking.create({
    user,
    center,
    slot,
    status,
    urgencyLevel,
  });
  res.status(201).json(booking);
});

//PUT api/bookings/:id Update existing entry
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user, center, slot, status, urgencyLevel } = req.body;
  const updated = await Booking.findByIdAndUpdate(
    id,
    { $set: { user, center, slot, status, urgencyLevel } },
    { new: true }
  );
  if (!updated)
    return res.status(404).json({ message: "There is nothing to update" });
  res.json(updated);
});

//DELETE api/bookings/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Booking.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
