const Classes = require('../models/Class.model')
const Activity = require('./../models/Activity.model')

function getActivityList(req, res, next) {

    Activity.find().populate('classes')
        .then(activityFound => res.status(200).json(activityFound))
        .catch(err => next(err))

}

function addActivity(req, res, next) {

    const { activityId, name, description, imageUrl } = req.body

    Activity.create({ activityId, name, description, imageUrl }).populate('classes')
        .then(() => res.status(200).json('Activity created succesfully'))
        .catch(err => next(err))

}

function deleteActivity(req, res, next) {

    const { activityId } = req.params
    const activityToDelete = Activity.findById(activityId).populate('classes')

    const promises = [Activity.findByIdAndDelete(activityId).populate('classes'),
    Classes.findOneAndUpdate(activityToDelete.classes)]


    Activity.findByIdAndDelete(activityId).populate('classes')
        .then(() => res.status(201).json("Activity deleted succesfully"))
        .catch(err => next(err))

}

module.exports = { getActivityList, addActivity, deleteActivity }