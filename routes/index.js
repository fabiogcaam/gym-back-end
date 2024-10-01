const app = require('../app')

module.exports = app => {

    const authRoutes = require('./auth.routes')
    app.use('/api/auth', authRoutes)

    const activityRoutes = require('./activities.routes.js')
    app.use('/actitivities', activityRoutes)

    const classesRoutes = require('./classes.routes.js')
    app.use('/classes', classesRoutes)
}