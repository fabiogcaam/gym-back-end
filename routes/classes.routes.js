const router = require('express').Router()
const { getClassesList, addClass, deleteClass } = require('./../controllers/class.controller')
const { verifyToken } = require('./../middlewares/verifyToken')
const { isAdmin } = require('./../middlewares/verifyUserType')

router.get('/', getClassesList)

router.post('/add', verifyToken, isAdmin, addClass)

router.post('/delete', verifyToken, isAdmin, deleteClass)