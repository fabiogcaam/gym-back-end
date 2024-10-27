const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const { createBooking, finishedBooking, deleteBooking } = require('./../controllers/booking.controller')

router.post('/create', verifyToken, createBooking)

router.post('/:id/finished', verifyToken, finishedBooking)

router.delete('/:idClass/delete', verifyToken, deleteBooking)

module.exports = router