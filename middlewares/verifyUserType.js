const isAdmin = (req, res, next) => {

    const { payload: loggedUser } = req
    console.log("ESTAMOS EN EL FACKING ISADMIN", loggedUser?.typeUser)

    if (loggedUser?.typeUser === "ADMIN") {
        next()
    } else {
        res.redirect('/')
    }
}


module.exports = { isAdmin }