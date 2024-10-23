const router = require('express').Router()
const { getClassesList, addClass, deleteClass, getClassesByDay } = require('./../controllers/class.controller')
const { verifyToken } = require('./../middlewares/verifyToken')
const { isAdmin } = require('./../middlewares/verifyUserType')

router.get('/', getClassesList)

router.get('/day', verifyToken, getClassesByDay)

router.post('/add', verifyToken, isAdmin, addClass)

router.post('/:id/delete', verifyToken, isAdmin, deleteClass)


module.exports = router