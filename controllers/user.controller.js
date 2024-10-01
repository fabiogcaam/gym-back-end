const User = require('./../models/User.model')
const Booking = require('./../models/Booking.model')

function bookingList(req, res, next) {

    const { loggedUser } = req.payload

    User
        .findById(loggedUser)
        .populate('bookings')
        .then((result) => res.json(result.bookings))
        .catch(err => next(err))
}