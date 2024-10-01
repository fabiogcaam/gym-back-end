const { Schema, model } = require('mongoose')

const bookingSchema = new Schema({
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Classes'
    },
    hour: {
        type: String,
        required: true
    }
})

const Booking = model('Booking', bookingSchema)

module.exports = Booking