const { Schema, model } = require("mongoose")

const activitySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        imageUrl: {
            type: String
        }
    })

const Activity = model("Activity", activitySchema)

module.exports = Activity