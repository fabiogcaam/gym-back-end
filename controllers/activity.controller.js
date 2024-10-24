const Activity = require('./../models/Activity.model')

function getActivityList(req, res, next) {

    Activity.find().populate('classes')
        .then(activityFound => res.status(200).json(activityFound))
        .catch(err => next(err))

}

function getActivity(req, res, next) {

    const { activity } = req.params
    console.log("Esto es en el activity Controller", req.params)

    Activity.findOne(activity)
        .then(activityFound => {
            console.log("ENTRAMOS EN LA FUNCION", activityFound)
            res.status(200).json(activityFound)
        })
        .catch(err => next(err))
}

function addActivity(req, res, next) {

    const { name, description, imageUrl } = req.body

    Activity.create({ name, description, imageUrl })
        .then(() => res.status(200).json('Activity created succesfully'))
        .catch(err => next(err))

}

function deleteActivity(req, res, next) {

    const { activityId } = req.params

    Activity.findByIdAndDelete(activityId)
        .then(() => res.status(201).json("Activity deleted succesfully"))
        .catch(err => next(err))

}

module.exports = { getActivityList, addActivity, deleteActivity, getActivity }