const Classes = require('../models/Class.model')
const Trainer = require('./../models/Trainer.model')

function getTrainers(req, res, next) {

    Trainer
        .find()
        .populate('activity')
        .then((trainer) => res.json(trainer))
        .catch(err => next(err))
}

function createTrainer(req, res, next) {

    const { name, age, description, imageUrl } = req.body


    Trainer
        .create({ name, age, description, imageUrl })
        .then(() => res.status(201).json('Trainer created succesfylly'))
        .catch(err => next(err))

}


function addActivityToTrainer(req, res, next) {

    const { idActivity } = req.params
    const { loggedUser } = req.payload

    if (loggedUser.typeUser == "TRAINER") {
        Trainer.findByIdAndUpdate(loggedUser._id, { activity: idActivity }).populate('activity').populate('classes')
            .then((trainerUpdated) => res.status(202).json(trainerUpdated))
            .catch(err => next(err))
    }

}

function addClassToTrainer(req, res, next) {

    const { loggedUser } = req.payload
    const { classId } = req.params

    const classToAdd = Classes.findById(classId)

    const promises = [Trainer.findByIdAndUpdate(loggedUser._id, { $push: { classes: classId } }, { new: true }).populate('activity').populate('classes'),
    Classes.findByIdAndUpdate(classId, { $push: { trainer: loggedUser } }, { new: true }).populate('activity').populate('activity')]


    if (loggedUser.typeUser == 'TRAINER') {
        Trainer.findById(loggedUser._id)
            .then(trainerFound => {
                if (trainerFound.classes.contains(classId)) {
                    res.status(400).json({ errorMessage: 'You are teaching this class already' })
                }
                if (classToAdd.activity != trainerFound.activity) {
                    res.status(400).json({ errorMessage: 'Trainer doesn´t know this activity' })
                }
                return Promise.all(promises)
            })
            .then(() => {
                res.status(201).json('Class added to Trainer and viceversa')
            })
            .catch(err => next(err))
    }
}


module.exports = {
    getTrainers,
    createTrainer,
    addClassToTrainer,
    addActivityToTrainer
}