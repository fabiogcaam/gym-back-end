const router = require('express').Router()
const { bookingList } = require('./../controllers/user.controller')

router.get('/bookings', bookingList)