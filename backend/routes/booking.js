const express = require("express");
const router = express.Router();
const Booking = require("../models/mongoose");

// Create booking
router.post("/book", async (req, res) => {
  const { date, time, guests, name, contact } = req.body;

  if (!date || !time || !guests || !name || !contact) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingBooking = await Booking.findOne({ date, time });

    if (existingBooking) {
      return res
        .status(400)
        .json({ success: false, message: "Slot already booked" });
    }

    const newBooking = new Booking({ date, time, guests, name, contact });
    await newBooking.save();

    res.status(201).json({ success: true, details: newBooking });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
