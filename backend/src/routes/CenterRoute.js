const express = require("express");
const router = express.Router();
const Center = require("../models/Center");

//GET all Centers
router.get("/", async (req, res) => {
  const centers = await Center.find();
  res.json(centers);
});

//POST api/centers => Create a new center
router.post("/", async (req, res) => {
  const { name, county, address, capacity, slots } = req.body;

  if (!county || !name || !address || !capacity || !slots)
    return res
      .status(400)
      .json({ message: "Please enter the required details." });

  const center = await Center.create({
    name,
    county,
    address,
    capacity,
    slots,
  });
  res.status(201).json(center);
});

//PUT api/centers/:id Update existing entry
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, county, address, capacity, slots } = req.body;
  const updated = await Center.findByIdAndUpdate(
    id,
    { $set: { name, county, address, capacity, slots } },
    { new: true }
  );
  if (!updated)
    return res.status(404).json({ message: "There is nothing to update" });
  res.json(updated);
});

//Get A single center by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const center = await Center.findById(id);
    if (!center) return res.status(404).json({ message: "center not found" });
    res.status(200).json(center);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE api/centers/:id ADMIN PRIVILEGE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Center.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Center not found" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD SLOT TO CENTER (ADMIN OR TESTING)
router.post("/:id/slots", async (req, res) => {
  try {
    const center = await Center.findById(req.params.id);
    if (!center) return res.status(404).json({ message: "Center not found" });

    const { start, end, capacity } = req.body;

    center.slots.push({
      start,
      end,
      capacity,
      booked: 0,
    });

    await center.save();

    return res.status(200).json({
      message: "Slot added",
      center,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
