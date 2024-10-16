const router = require('express').Router()
const { bookingList, deleteBooking } = require('./../controllers/user.controller')
const { verifyToken } = require('./../middlewares/verifyToken')

router.get('/bookings', verifyToken, bookingList)

router.post('/deleteBooking', verifyToken, deleteBooking)

module.exports = router