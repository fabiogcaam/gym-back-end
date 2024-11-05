const router = require('express').Router()
const { getActivityList, addActivity, deleteActivity, getActivity } = require('./../controllers/activity.controller')
const { verifyToken } = require('./../middlewares/verifyToken')
const { isAdmin } = require('./../middlewares/verifyUserType')

router.get('/', getActivityList)

router.get('/getById/:id', getActivity)

router.post('/add', verifyToken, isAdmin, addActivity)

router.post('/:id/delete', verifyToken, isAdmin, deleteActivity)


module.exports = router
