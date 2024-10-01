const Trainer = require('./../models/Trainer.model')
const Activity = require('./../models/Activity.model')

function getTrainers(req, res, next) {

    Trainer
        .find()
        .populate('activity')
        .then((trainer) => res.json(trainer))
        .catch(err => next(err))
}

module.exports = {
    getTrainers
}