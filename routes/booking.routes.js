const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const { createBooking, finishedClass } = require('./../controllers/booking.controller')

router.post('/create', verifyToken, createBooking)

router.post('/finished', verifyToken, finishedClass)

module.exports = router