const router = require('express').Router()
const { bookingList } = require('./../controllers/user.controller')
const { verifyToken } = require('./../middlewares/verifyToken')

router.get('/bookings', verifyToken, bookingList)