const router = require('express').Router()
const { getActivityList, addActivity, deleteActivity } = require('./../controllers/activity.controller')
const { verifyToken } = require('./../middlewares/verifyToken')
const { isAdmin } = require('./../middlewares/verifyUserType')

router.get('/', getActivityList)

router.post('/add', addActivity)

router.post('/:id/delete', verifyToken, isAdmin, deleteActivity)

module.exports = router
