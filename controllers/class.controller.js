const Classes = require('./../models/Class.model')
const Activity = require('./../models/Activity.model')
const Trainer = require('./../models/Trainer.model')

function getClassesList(req, res, next) {

    Classes.find().populate('users').populate('activity')
        .then(classFound => {
            res.status(200).json(classFound)
        })
        .catch(err => next(err))

}

function addClass(req, res, next) {

    const { activityId, trainerId, schedule, participants, numParticipants } = req.body

    Activity
        .findById({ _id: activityId })
        .populate('classes')
        .then((foundActivity) => {
            if (!foundActivity) {
                return res.status(400).json({ errorMessage: 'This activity doesn´t exist' })
            }
            return Trainer.findById({ _id: trainerId }).populate('activity')
        })
        .then((foundTrainer) => {
            if (!foundTrainer) {
                return res.status(400).json('This trainer doesn´t exists')
            }
            if (foundTrainer.activity && foundTrainer.activity.equals(activityId)) {
                return Classes.create({ activityId, trainerId, schedule, participants, numParticipants }).populate('activity').populate('trainer').populate('participants')
            } else {
                return res.status(400).json('Trainer is not associated to this Class')
            }
        })
        .then((createdClass) => res.json(createdClass))
        .catch(err => next(err))

}

function deleteClass(req, res, next) {

    const { classId } = req.params

    Classes.findByIdAndDelete(classId)
        .then(() => res.status(201).json('deleted succesfully'))
        .catch(err => next(err))

}

function getClassesByDay(req, res, next) {

    const { day } = req.query

    Classes.find({ 'schedule.day': day })
        .then((classes) => res.status(201).json(classes))
        .catch(err => next(err))

}

module.exports = {
    getClassesList,
    addClass,
    deleteClass,
    getClassesByDay
}