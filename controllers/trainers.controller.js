const Trainer = require('./../models/Trainer.model')
const Activity = require('./../models/Activity.model')

function getTrainers(req, res, next) {

    Trainer
        .find()
        .populate('activity')
        .then((trainer) => res.json(trainer))
        .catch(err => next(err))
}

function getTrainersByActivity(req, res, next) {

    console.log("ENTRAMOS EN EL CONTROLLER")
    const { activityId } = req.params

    Trainer.find({ activity: activityId })
        .then((trainers) => {
            console.log("ESTOS SON LOS ENTRENADORES QUE HACEN ESA ACTIVIDAD", trainers)
            res.status(200).json(trainers)
        })
        .catch(err => next(err))


}

function createTrainer(req, res, next) {


    const { name, age, description, imageUrl, activityId } = req.body


    Trainer
        .create({ name, age, description, imageUrl, activity: activityId })
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


module.exports = {
    getTrainers,
    getTrainersByActivity,
    createTrainer,
    addActivityToTrainer
}