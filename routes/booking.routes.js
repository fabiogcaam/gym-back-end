const router = require('express').Router()
const { createBooking } = require('./../controllers/booking.controller')

router.post('/create', createBooking)