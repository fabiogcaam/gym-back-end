const { Schema, model } = require('mongoose')

const classSchema = new Schema({
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    },
    trainer: {
        type: Schema.Types.ObjectId,
        ref: 'Trainer'
    },
    schedule: {
        type: Array,
        required: [true, 'Schedule is required']
    }
})

const Classes = model('Classes', classSchema)

module.exports = Classes

