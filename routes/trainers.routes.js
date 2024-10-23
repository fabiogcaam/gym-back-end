const router = require('express').Router()
const { getTrainers, createTrainer, addActivityToTrainer } = require('./../controllers/trainers.controller')
const { isAdmin } = require('./../middlewares/verifyUserType')
const { verifyToken } = require('./../middlewares/verifyToken')

router.get('/', getTrainers)

router.post('/:idActivity/create', verifyToken, isAdmin, createTrainer)

router.post('/addActivity', verifyToken, isAdmin, addActivityToTrainer)

module.exports = router
