const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Center = require("../models/Center");

//GET all Bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// Create booking only if center has available slots
router.post("/", async (req, res) => {
  try {
    const { userId, centerId } = req.body;

    // 1. Get center
    const center = await Center.findById(centerId);
    if (!center) {
      return res.status(404).json({ message: "Center not found" });
    }

    // 2. Validate slots exist
    if (!center.slots || center.slots.length === 0) {
      return res.status(400).json({ message: "Center has no available slots" });
    }

    // 3. Find FIRST available slot
    const availableSlot = center.slots.find(
      (slot) => slot.booked < slot.capacity
    );

    if (!availableSlot) {
      return res.status(400).json({ message: "Center slots are fully booked" });
    }

    // 4. Auto-assign this slot to booking
    const selectedSlot = {
      start: availableSlot.start,
      end: availableSlot.end,
    };

    // 5. Increase booked count for that slot
    availableSlot.booked += 1;
    await center.save();

    // 6. Create booking
    const booking = await Booking.create({
      user: userId,
      center: centerId,
      slot: selectedSlot, // assigned slot
      status: "pending",
    });

    return res.status(201).json({
      message: "Booking request submitted",
      assignedSlot: selectedSlot,
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
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

//Access pending bookings as Admin
router.get("/pending", async (req, res) => {
  try {
    const pendingBookings = await Booking.find({ status: "pending" })
      .populate("center")
      .populate("user");

    res.json(pendingBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Approve booking as Admin
router.post("/:id/approve", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("center");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Prevent double approval
    if (booking.status === "approved") {
      return res.status(400).json({ message: "Booking already approved" });
    }

    // Prevent approving rejected bookings
    if (booking.status === "rejected") {
      return res
        .status(400)
        .json({ message: "Cannot approve a rejected booking" });
    }

    booking.status = "approved";
    await booking.save();

    res.json({
      message: "Booking approved",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Reject Booking as Admin
router.post("/:id/reject", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Prevent double rejection
    if (booking.status === "rejected") {
      return res.status(400).json({ message: "Booking already rejected" });
    }

    // Undo reservation only if previously pending and a slot exists
    const center = await Center.findById(booking.center);

    if (booking.slot && center) {
      const slotToFix = center.slots.find(
        (s) =>
          s.start.toISOString() === booking.slot.start.toISOString() &&
          s.end.toISOString() === booking.slot.end.toISOString()
      );

      if (slotToFix && slotToFix.booked > 0) {
        slotToFix.booked -= 1;
        await center.save();
      }
    }

    booking.status = "rejected";
    await booking.save();

    res.json({
      message: "Booking rejected and slot restored",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
