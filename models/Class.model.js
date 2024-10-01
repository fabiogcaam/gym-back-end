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
    },
    participants: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        validate: {
            validator: function (v) {
                return v.length <= this.numParticipants
            },
            props: `It must have a maximum of ${numParticipants} per class`
        }
    },
    numParticipants: {
        type: Number,
        required: [true, 'Max number of participants ir required']
    }
})

const Classes = model('Classes', classSchema)

module.exports = Classes

