const router = require('express').Router()
const { getTrainers, createTrainer, addActivityToTrainer, addClassToTrainer } = require('./../controllers/trainers.controller')

router.get('/', getTrainers)

router.post('/create', createTrainer)

router.post('/addActivity', addActivityToTrainer)

router.post('/addClass', addClassToTrainer)