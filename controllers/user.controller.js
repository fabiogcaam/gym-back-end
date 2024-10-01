const User = require('./../models/User.model')
const Booking = require('./../models/Booking.model')

function addBooking(req, res, next) {

    const { _id } = req.params

    User.findById({ _id })
        .then()
}