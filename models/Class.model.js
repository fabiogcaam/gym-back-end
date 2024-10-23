const { Schema, model } = require('mongoose')

const classSchema = new Schema({
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
        required: [true, 'An activity is mandatory']
    },
    trainer: {
        type: Schema.Types.ObjectId,
        ref: 'Trainer',
        required: [true, 'Trainer is mandatory']
    },
    schedule: [{
        day: {
            type: String,
            required: true,
        },
        time: [{
            type: String,
            required: true
        }]
    }],
    numParticipants: {
        type: Number,
        required: [true, 'Max number of participants is required']
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            validate: {
                validator: function (v) {
                    return v.length <= this.numParticipants
                },
                props: `It must have a maximum of ${this.numParticipants} per class`
            }
        }
    ]
})

const Classes = model('Classes', classSchema)

module.exports = Classes

