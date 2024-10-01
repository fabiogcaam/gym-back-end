const { Schema, model } = require('mongoose')

const trainerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    imageUrl: {
        type: String
    },
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    },
    classes: {
        type: [Schema.Types.ObjectId],
        ref: 'Classes'
    }
})

const Trainer = model('Trainer', trainerSchema)

module.exports = Trainer