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

function getClass(req, res, next) {

    const { classId } = req.params

    console.log("ESTOOTOOTO", classId)

    Classes.findById(classId).populate('trainer')
        .then(result => {
            res.json(result)
        })
        .catch(err => next(err))
}


function addClass(req, res, next) {

    const { trainerId, schedule, numParticipants, dates } = req.body

    if (!trainerId || typeof trainerId !== 'string') {
        return res.status(400).json({ errorMessage: "El campo trainerId es obligatorio y debe ser una cadena válida." })
    }

    if (!schedule || typeof schedule.time !== 'string') {
        return res.status(400).json({ errorMessage: "El campo schedule es obligatorio y debe tener un campo 'time'." })
    }

    if (!numParticipants || typeof numParticipants !== 'number') {
        return res.status(400).json({ errorMessage: "El campo numParticipants es obligatorio y debe ser un número." })
    }


    Trainer.findById(trainerId).populate('activity')
        .then((foundTrainer) => {
            if (!foundTrainer) {
                return res.status(400).json('This trainer doesn´t exists')
            }
            return Classes.create({ trainer: trainerId, schedule, numParticipants, dates })

        })
        .then((createdClass) => res.status(201).json(createdClass))
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

    Classes.find({ dates: day }).populate('trainer').sort({ 'schedule.time': 1 })
        .then((classes) => {
            console.log(classes)
            res.status(200).json(classes)
        })
        .catch(err => next(err))

}

module.exports = {
    getClassesList,
    getClass,
    addClass,
    deleteClass,
    getClassesByDay
}