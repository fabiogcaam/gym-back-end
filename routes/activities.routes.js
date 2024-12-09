const router = require('express').Router()
const { getActivityList, addActivity, deleteActivity, getActivity, getActivityById } = require('./../controllers/activity.controller')
const { verifyToken } = require('./../middlewares/verifyToken')
const { isAdmin } = require('./../middlewares/verifyUserType')

router.get('/', getActivityList)

router.get('/getById/:id', getActivity)

router.get('/:activityId', verifyToken, isAdmin, getActivityById)

router.post('/add', verifyToken, isAdmin, addActivity)

router.post('/:id/delete', verifyToken, isAdmin, deleteActivity)


module.exports = router
