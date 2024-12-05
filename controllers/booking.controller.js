const Booking = require('./../models/Booking.model')
const Classes = require('./../models/Class.model')
const User = require('./../models/User.model')

function createBooking(req, res, next) {

    const { classId, bookingDate } = req.body
    const { payload: loggedUser } = req

    console.log("ESTE ES EL USUARIO", loggedUser)

    let myClass
    console.log("ENTRAMOS EN EL BOOKING CONTROLLER", classId, "Y la fecha es:", bookingDate)

    if (!classId || !bookingDate) {
        return res.status(400).json('Class ID and Booking Date are required');
    }

    Classes
        .findById(classId)
        .populate('participants')
        .then((foundClass) => {
            if (!foundClass) {
                return res.status(400).json('This class doen´t exists')
            }
            myClass = foundClass
            return Booking.findOne({ class: foundClass._id }).populate('class')
        })
        .then((existingBooking) => {
            console.log("ENTRO EN QUE EL BOOKING EXISTE")
            if (existingBooking) {
                return res.status(400).json('You already have a booking for this class')
            }
            if (myClass.participants.length >= myClass.numParticipants) {
                return res.status(400).json('The class is full')
            }
            console.log("AHORA TENDRÍA QUE CREAR EL BOOKING")
            return Booking.create({ class: classId, bookingDate: bookingDate })
        })
        .then((booking) => {
            console.log("AHORA TENDRÍA QUE AÑADIR EL BOOKING CREADO EN USER Y CLASS", booking)
            return Promise.all([
                User.findByIdAndUpdate({ _id: loggedUser._id }, { $push: { bookings: booking._id } }, { new: true }).populate('bookings'),
                Classes.findByIdAndUpdate({ _id: classId }, { $push: { participants: loggedUser } }, { new: true }).populate('participants')
            ])
        })
        .then(() => {
            res.status(201).json('Booking created succesfully')
        })
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

    const { payload: loggedUser } = req
    const { bookingId } = req.params
    console.log("ESTO", bookingId)

    console.log("LLEGAMOS AQUIII")


    Booking.findById(bookingId)
        .then((booking) => {

            if (!booking) {
                return res.status(404).json({ message: "Booking not found" })
            }

            const promises = [
                Booking.findOneAndDelete(bookingId).populate("Classes"),
                User.findByIdAndUpdate(loggedUser, { $pull: { booking: bookingId } }, { new: true }),
                Classes.findByIdAndUpdate(booking.class, { $pull: { participants: loggedUser._id } }, { new: true })
            ]

            return Promise.all(promises)
        })
        .then(() => res.status(200).json("Deleted booking succesfully"))
        .catch(err => next(err))

}

module.exports = {
    createBooking,
    finishedBooking,
    deleteBooking
}

