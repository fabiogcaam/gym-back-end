const Activity = require('./../models/Activity.model')

function getActivityList(req, res, next) {

    Activity.find()
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

function getActivityById(req, res, next) {

    const { activityId } = req.params
    console.log("ENTRAMOS EN ACTIVITY BY ID CONTROLLER", activityId)

    Activity.findById({ _id: activityId })
        .then((activity) => {
            console.log(activity)
            res.status(200).json(activity)
        }
        )
        .catch(err => next(err))
}

function addActivity(req, res, next) {

    const { name, description, imageUrl } = req.body
    console.log("ENTRAMOS EN EL ACTIVIITY CONTROLLER")

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

module.exports = { getActivityList, getActivityById, addActivity, deleteActivity, getActivity }