const Classes = require('./../models/Class.model')
const Activity = require('./../models/Activity.model')
const Trainer = require('./../models/Trainer.model')

function getClassesList(req, res, next) {

    Classes.find().populate('activity').populate('trainer')
        .then(classFound => {
            res.status(200).json(classFound)
        })
        .catch(err => next(err))

}

function addClass(req, res, next) {

    const { trainerId } = req.params
    const { schedule, participants, numParticipants } = req.body

    Trainer.findById(trainerId).populate('activity')
        .then((foundTrainer) => {
            if (!foundTrainer) {
                return res.status(400).json('This trainer doesn´t exists')
            }
            return Classes.create({ trainer: trainerId, schedule, participants, numParticipants })

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

    const { day } = req.params
    console.log(req.params)
    console.log('el dia es,', day)

    Classes.find({ 'schedule.day': day }).populate('trainer')
        .then((classes) => {
            console.log(classes)
            res.status(200).json(classes)
        })
        .catch(err => next(err))

}

module.exports = {
    getClassesList,
    addClass,
    deleteClass,
    getClassesByDay
}