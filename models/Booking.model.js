const { Schema, model } = require('mongoose')

const bookingSchema = new Schema({
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
        enum: ['Reserved', 'Finished'],
        default: 'Reserved'
    }
},
    {
        timestamps: true
    })

const Booking = model('Booking', bookingSchema)

module.exports = Booking