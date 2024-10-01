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
            return Booking.findOne({ user: loggedUser, class: classId })
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
                User.findByIdAndUpdate(loggedUser, { $push: { bookings: booking._id } }, { new: true }),
                Classes.findByIdAndUpdate(classId, { $push: { participants: loggedUser } }, { new: true })
            ])
        })
        .then(() => res.status(201).json('Booking created succesfully'))
        .catch(err => next(err))
}

module.exports = {
    createBooking
}

