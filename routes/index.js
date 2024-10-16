module.exports = app => {

    const authRoutes = require('./auth.routes')
    app.use('/api/auth', authRoutes)

    const activityRoutes = require('./activities.routes.js')
    app.use('/api/activities', activityRoutes)

    const classesRoutes = require('./classes.routes.js')
    app.use('/api/classes', classesRoutes)

    const trainersRoutes = require('./trainers.routes.js')
    app.use('/api/trainers', trainersRoutes)

    const bookingRoutes = require('./booking.routes.js')
    app.use('/api/bookings', bookingRoutes)

    const userRoutes = require('./user.routes.js')
    app.use('/api/users', userRoutes)

}