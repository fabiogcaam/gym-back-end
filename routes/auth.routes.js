const router = require("express").Router()
const { signup, login, verify } = require('./../controllers/auth.controller')
const { verifyToken } = require('../middlewares/verifyToken')

router.post("/signup", signup)

router.post('/login', login)

router.get('/verify', verifyToken, verify)


module.exports = router
