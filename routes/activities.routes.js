const router = require('express').Router()
const { getActivityList, addActivity, deleteActivity } = require('./../controllers/activity.controller')

router.get('/', getActivityList)

router.post('/add', addActivity)

router.post('/delete', deleteActivity)
