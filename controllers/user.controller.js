const User = require('./../models/User.model')

function bookingList(req, res, next) {

    const { loggedUser } = req.payload

    User
        .findById(loggedUser)
        .populate('bookings')
        .then((result) => res.json(result.bookings))
        .catch(err => next(err))

}

module.exports = {
    bookingList
}
