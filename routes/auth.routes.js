const router = require("express").Router()
const { signup, login, verify } = require('./../controllers/auth.controller')

router.get("/signup", signup)

router.get('/login', login)

router.get('/verify', verify)


module.exports = router
