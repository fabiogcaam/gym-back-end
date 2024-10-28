const User = require('./../models/User.model')
const Booking = require('./../models/Booking.model')

function bookingList(req, res, next) {

    const { loggedUser } = req.payload

    User
        .findById(loggedUser._id)
        .populate('bookings')
        .then((result) => res.json(result.bookings))
        .catch(err => next(err))

}

function addBooking(req, res, next) {

    const { loggedUser } = req.payload
    const { classId } = req.params

    Booking
        .findOne({ user: loggedUser._id, class: classId })
        .populate('user')
        .populate('class')
        .then((foundBooking) => {
            if (foundBooking) {
                return res.status(400).json({ errorMessage: 'You already are added to this class' })
            }
            return Booking.create({ user: loggedUser, class: classId })
        })
        .then((bookingCreated) => {
            User.findByIdAndUpdate(loggedUser, { $push: { bookings: bookingCreated._id } })
        })
        .catch(err => next(err))
}

function deleteBooking(req, res, next) {

    const { loggedUser } = req.payload
    const { bookingId } = req.params

    const promises = [
        User.findByIdAndUpdate(loggedUser, { $pull: { bookings: bookingId } }, { new: true }).populate('bookings'),
        Booking.findByIdAndDelete(bookingId).populate('user').populate('class')
    ]

    Promise.all(promises)
        .then(() => res.status(202).json('Booking deleted properly'))
        .catch(err => next(err))

}


module.exports = {
    bookingList,
    addBooking,
    deleteBooking
}
