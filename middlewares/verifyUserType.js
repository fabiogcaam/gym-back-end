function isAdmin(req, res, next) {
    const { loggedUser } = req.payload

    if (loggedUser.userType === "ADMIN") {
        next()
    } else {
        res.render('/')
    }
}

module.exports = { isAdmin }