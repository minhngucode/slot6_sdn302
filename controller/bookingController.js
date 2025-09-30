const Booking = require('../model/bookingModel');
const Room = require('../model/roomModel');

exports.createBooking = async (req, res) => {
    const { customerId, roomId, checkInDate, checkOutDate } = req.body;
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
        return res.status(400).json({
            message: 'checkInDate must be before checkOutDate',
            data: null
        });
    }
    const existingBookings = await Booking.find({
        roomId,
        $or: [
            { checkInDate: { $lte: checkOutDate }, checkOutDate: { $gte: checkInDate } }
        ],
        status: { $ne: 'cancelled' }
    });
    if (existingBookings.length > 0) {
        return res.status(200).json({
            message: 'Room is already booked for the selected dates',
            data: null
        });;
    }
    const booking = new Booking({ customerId, roomId, checkInDate, checkOutDate });
    await booking.save();
    await Room.findOneAndUpdate({ id: roomId }, { status: 'booked' });
    res.status(201).json(booking);
}

exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        return res.status(200).json({
            message: 'Booking not found',
            data: null
        });
    }
    if (new Date(booking.checkInDate) <= new Date()) {
        return res.status(200).json({
            message: 'Cannot cancel booking on or after check-in date',
            data: null
        });
    }

    booking.status = 'cancelled';
    await booking.save();
    await Room.findOneAndUpdate({ id: booking.roomId }, { status: 'available' });
    res.status(200).json({
        message: 'Booking cancelled successfully',
        data: booking
    });
}

exports.getAllBookings = async (req, res) => {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
}

exports.getBookingByDate = async (req, res) => {
    const { checkInDate, checkOutDate } = req.query;

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
        return res.status(400).json({ message: 'checkInDate must be before checkOutDate' });
    }

    const bookings = await Booking.find({
        checkInDate: { $gte: checkInDate },
        checkOutDate: { $lte: checkOutDate }
    });

    res.json(bookings);
}