const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;