const express = require('express');
const router = express.Router();
const { createBooking } = require('../controller/bookingController');
const { cancelBooking } = require('../controller/bookingController');
const { getAllBookings } = require('../controller/bookingController');
const { getBookingByDate } = require('../controller/bookingController');

router.post('/bookings', createBooking)
router.delete('/bookings/:bookingId', cancelBooking);
router.get('/bookings', getAllBookings);
router.get('/bookingsByDate', getBookingByDate);
module.exports = router;