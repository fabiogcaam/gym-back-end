const router = require('express').Router()
const { getTrainers, createTrainer, addActivityToTrainer } = require('./../controllers/trainers.controller')

router.get('/', getTrainers)

router.post('/:idActivity/create', createTrainer)

router.post('/addActivity', addActivityToTrainer)

module.exports = router
