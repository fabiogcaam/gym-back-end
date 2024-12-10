const Classes = require('./../models/Class.model')
const Activity = require('./../models/Activity.model')
const Trainer = require('./../models/Trainer.model')
const moment = require('moment')

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

function generateWeeklyDates(dayOfWeek, startTime, weeks = 4) {
    const dates = []
    const currentDate = moment().startOf('week')

    for (let i = 0; i < weeks; i++) {
        const date = currentDate.clone().add(i, 'weeks').day(dayOfWeek)
        dates.push(date.toDate)
    }
    return dates
}

function addClass(req, res, next) {

    const { trainerId, schedule, numParticipants, dates } = req.body

    const generatedDates = generateWeeklyDates(dates, schedule.time)

    if (!Array.isArray(dates) || dates.length < 4) {
        return res.status(400).json({ error: 'Debe haber al menos 4 fechas en el campo "dates".' });
    }

    // Validación adicional de que las fechas sean instancias de Date
    const invalidDates = dates.filter(date => isNaN(new Date(date).getTime()));
    if (invalidDates.length > 0) {
        return res.status(400).json({ error: 'Algunas fechas son inválidas.' });
    }

    Trainer.findById(trainerId).populate('activity')
        .then((foundTrainer) => {
            if (!foundTrainer) {
                return res.status(400).json('This trainer doesn´t exists')
            }
            return Classes.create({ trainer: trainerId, schedule, numParticipants, dates: generatedDates })

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

    Classes.find({ 'schedule.day': day }).populate('trainer').sort({ 'schedule.time': 1 })
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