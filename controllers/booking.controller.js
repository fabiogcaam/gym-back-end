const Booking = require('./../models/Booking.model')
const Classes = require('./../models/Class.model')
const User = require('./../models/User.model')

function createBooking(req, res, next) {

    const { classId } = req.body
    const { loggedUser } = req.payload

    let myClass

    Classes
        .findById(classId)
        .populate('participants')
        .then((foundClass) => {
            if (!foundClass) {
                return res.status(400).json('This class doen´t exists')
            }
            myClass = foundClass
            return Booking.findOne({ user: loggedUser._id, class: classId })
        })
        .then((existingBooking) => {
            if (existingBooking) {
                return res.status(400).json('You already have a booking for this class')
            }
            if (myClass.participants.length >= myClass.numParticipants) {
                return res.status(400).json('The class is full')
            }
            return Booking.create({ user: loggedUser, class: classId })
        })
        .then((booking) => {
            return Promise.all([
                User.findByIdAndUpdate(loggedUser._id, { $push: { bookings: booking._id } }, { new: true }),
                Classes.findByIdAndUpdate(classId, { $push: { participants: loggedUser } }, { new: true })
            ])
        })
        .then(() => res.status(201).json('Booking created succesfully'))
        .catch(err => next(err))
}

function finishedBooking(req, res, next) {

    const todaysDate = new Date()
    const { bookingId } = req.params

    Booking.findById(bookingId)
        .populate('user')
        .populate('class')
        .then((foundBooking) => {
            if (!foundBooking) {
                return res.status(400).json({ errorMessage: 'This booking doesn´t exists' })
            }
            if (foundBooking.bookingDate <= todaysDate) {
                return res.status(400).json({ errorMessage: 'The booking hasn´t finished yet' })
            }
            foundBooking.status == "Finished"
            return res.status(201).json('This booking has finished')
        })
        .catch(err => next(err))
}

function deleteBooking(req, res, next) {

    const { loggedUser } = req.payload
    const { idClass } = req.params

    const promises = [
        User.findByIdAndUpdate(loggedUser, { $pull: { class: idClass } }, { new: true }),
        Classes.findByIdAndUpdate(idClass, { $pull: { user: loggedUser._id } }, { new: true }),
        Booking.findOneAndDelete({ user: loggedUser._id, class: idClass })
    ]

    Promise.all(promises)
        .then(() => res.status(200).json("Deleted booking succesfully"))
        .catch(err => next(err))

}

module.exports = {
    createBooking,
    finishedBooking,
    deleteBooking
}

