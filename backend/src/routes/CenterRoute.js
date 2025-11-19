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

//DELETE api/centers/:id
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

module.exports = router;
