function isAdmin(req, res, next) {
    const { payload: loggedUser } = req

    if (loggedUser.typeUser === "ADMIN") {
        next()
    } else {
        res.render('/')
    }
}


module.exports = { isAdmin }