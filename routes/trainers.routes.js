const router = require('express').Router()
const { getTrainers, getTrainersByActivity, createTrainer, addActivityToTrainer } = require('./../controllers/trainers.controller')
const { isAdmin } = require('./../middlewares/verifyUserType')
const { verifyToken } = require('./../middlewares/verifyToken')

router.get('/', getTrainers)

router.get('/:activityId', verifyToken, isAdmin, getTrainersByActivity)

router.post('/create', verifyToken, isAdmin, createTrainer)

router.post('/addActivity', verifyToken, isAdmin, addActivityToTrainer)

module.exports = router
