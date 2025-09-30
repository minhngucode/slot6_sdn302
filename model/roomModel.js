const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    status: { type: String, enum: ['available', 'booked'], default: 'available' }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;