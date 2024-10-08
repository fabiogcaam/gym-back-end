const router = require('express').Router()
const { getClasses, addClass, deleteClass } = require('./../controllers/class.controller')
const { verifyToken } = require('./../middlewares/verifyToken')

router.get('/', getClasses)

router.post('/addClass', verifyToken, addClass)

router.post('/deleteClass', verifyToken, deleteClass)