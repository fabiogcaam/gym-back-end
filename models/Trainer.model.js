const { Schema, model } = require('mongoose')

const trainerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    imageUrl: {
        type: String
    }
})

const Trainer = model('Trainer', trainerSchema)

module.exports = Trainer