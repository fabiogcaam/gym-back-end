const router = require('express').Router()
const { getClasses, addClass, deleteClass } = require('./../controllers/class.controller')
const { verifyToken } = require('./../middlewares/verifyToken')
const { isAdmin } = require('./../middlewares/verifyUserType')

router.get('/', getClasses)

router.post('/addClass', verifyToken, isAdmin, addClass)

router.post('/deleteClass', verifyToken, isAdmin, deleteClass)