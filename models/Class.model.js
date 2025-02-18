const { Schema, model } = require('mongoose')

const classesSchema = new Schema({
    trainer: {
        type: Schema.Types.ObjectId,
        ref: 'Trainer',
    },
    schedule: {
        time: {
            type: String,
            required: true
        }
    },
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
    ],
    dates: {
        type: Date,
        required: true
    }
})

const Classes = model('Classes', classesSchema)

module.exports = Classes

