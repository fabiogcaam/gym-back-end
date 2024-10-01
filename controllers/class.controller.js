const Classes = require('./../models/Class.model')
const Activity = require('./../models/Activity.model')
const Trainer = require('./../models/Trainer.model')

function addClass(req, res, next) {

    const { activity, trainer, schedule, participants, numParticipants } = req.body

    Activity
        .findById({ _id: activity })
        .populate('classes')
        .then((foundActivity) => {
            if (!foundActivity) {
                return res.status(400).json({ errorMessage: 'This activity doesn´t exist' })
            }
            return Trainer
                .findById({ _id: trainer })
                .populate('classes')
                .populate('activity')
        })
        .then((foundTrainer) => {
            if (!foundTrainer) {
                return res.status(400).json('This trainer doesn´t exists')
            }

            if (foundTrainer.activity && foundTrainer.activity.equals(activity)) {
                return Classes.create({ activity, trainer, schedule, participants, numParticipants }).populate('activity').populate('trainer').populate('participants')
            } else {
                return res.status(400).json('Trainer is not associated to this Class')
            }
        })
        .then((createdClass) => res.json(createdClass))
        .catch(err => next(err))

}

module.exports = {
    addClass
}