const express = require("express");
const router = express.Router();

// Delete booking
router.delete("/delete", (req, res) => {
  const { date, time } = req.body;

  bookings = bookings.filter(
    (booking) => !(booking.date === date && booking.time === time)
  );

  res.json({ success: true, message: "Booking deleted" });
});
module.exports = router;
