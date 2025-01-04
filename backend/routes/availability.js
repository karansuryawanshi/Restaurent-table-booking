const express = require("express");
const router = express.Router();

// Get availability
router.get("/api/availability", (req, res) => {
  const { date, time } = req.query;
  const availableSlots = ["12:00", "14:00", "16:00", "18:00", "20:00"];

  const bookedSlots = bookings
    .filter((booking) => booking.date === date && booking.time === time)
    .map((booking) => booking.time);

  const slots = availableSlots.filter((slot) => !bookedSlots.includes(slot));
  res.json(slots);
});

module.exports = router;
