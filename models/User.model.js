const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
      }
    ],
    typeUser: {
      type: String,
      enum: ['USER', 'TRAINER', 'ADMIN'],
      default: 'USER'
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {

  const { _id, name, email, password } = this
  const payload = { _id, name, email, password, typeUser }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: '6h' }
  )

  return authToken

}

userSchema.methods.validatePassword = function (userPassword) {
  return bcrypt.compareSync(userPassword, this.password)
}



const User = model("User", userSchema)

module.exports = User
