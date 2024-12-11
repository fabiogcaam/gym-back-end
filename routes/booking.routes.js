const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const { createBooking, finishedBooking, findBookingByClass, deleteBooking } = require('./../controllers/booking.controller')

router.get('/byClass', verifyToken, findBookingByClass)

router.post('/create', verifyToken, createBooking)

router.post('/:id/finished', verifyToken, finishedBooking)

router.post('/:bookingId/delete', verifyToken, deleteBooking)

module.exports = router