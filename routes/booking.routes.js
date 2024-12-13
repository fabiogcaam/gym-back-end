const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const { createBooking, finishedBooking, deleteBooking } = require('./../controllers/booking.controller')

router.post('/create', verifyToken, createBooking)

router.post('/:bookingId/finished', verifyToken, finishedBooking)

router.post('/:bookingId/delete', verifyToken, deleteBooking)

module.exports = router