const Activity = require('./../models/Activity.model')

function getActivityList(req, res, next) {

    Activity.find().populate('classes')
        .then(activityFound => res.status(200).json(activityFound))
        .catch(err => next(err))

}

function addActivity(req, res, next) {

    const { name, description, imageUrl } = req.body

    Activity.create({ name, description, imageUrl }).populate('classes')
        .then(() => res.status(200).json('Activity created succesfully'))
        .catch(err => next(err))

}

function deleteActivity(req, res, next) {

    const { activityId } = req.params

    Activity.findByIdAndDelete(activityId)
        .then(() => res.status(201).json("Activity deleted succesfully"))
        .catch(err => next(err))

}

module.exports = { getActivityList, addActivity, deleteActivity }