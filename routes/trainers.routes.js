const router = require('express').Router()
const { getTrainers } = require('./../controllers/trainers.controller')

router.get('/', getTrainers)