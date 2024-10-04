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

function addClassToTrainer(req, res, next) {

    const { idClass } = req.params

    const { loggedUser } = req.payload

    Trainer.findByIdAndUpdate(loggedUser, { $push: { class: idClass } }, { new: true }).populate('activity').populate('class')
        .then((trainerUpdated) => res.status(202).json(trainerUpdated))
        .catch(err => next(err))

}

function addActivityToTrainer(req, res, next) {

    const { idActivity } = req.params
    const { loggedUser } = req.payload

    Trainer.findByIdAndUpdate(loggedUser, { $push: { activity: idActivity } }, { new: true }).populate('activity').populate('class')
        .then((trainerUpdated) => res.status(202).json(trainerUpdated))
        .catch(err => next(err))

}


module.exports = {
    getTrainers,
    createTrainer,
    addClassToTrainer,
    addActivityToTrainer
}