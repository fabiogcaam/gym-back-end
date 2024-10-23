const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./../models/User.model')

function signup(req, res, next) {
    const { name, email, password } = req.body

    User
        .create({ name, email, password, typeUser: "USER" })
        .then(() => res.status(201).json('User created succesfully'))
        .catch(err => next(err))
}

function login(req, res, next) {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ errorMessage: ["Provide Email and Password"] })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ errorMessage: ["User not found"] })
                return
            }

            if (foundUser.validatePassword(password)) {
                const { _id, name, email, password, typeUser } = foundUser
                const payload = { _id, name, email, password, typeUser }

                const authToken = foundUser.signToken()

                res.status(201).json({ authToken })
            } else {
                res.status(401).json({ errorMessage: ['Incorrect password'] })
            }
        })
        .catch(err => next(err))
}

function verify(req, res, next) {
    const loggedUser = req.payload
    res.json({ loggedUser })
}

module.exports = {
    signup,
    login,
    verify
}