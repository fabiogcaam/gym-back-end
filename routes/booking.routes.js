const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const { createBooking, finishedBooking } = require('./../controllers/booking.controller')

router.post('/create', verifyToken, createBooking)

router.post('/:id/finished', verifyToken, finishedBooking)

module.exports = router