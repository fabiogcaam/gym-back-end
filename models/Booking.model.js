const { Schema, model } = require('mongoose')

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Classes',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Reserved', 'Canceled', 'Finished'],
        default: 'Reserved'
    }
})

const Booking = model('Booking', bookingSchema)

module.exports = Booking