module.exports = (app) => {
    const signalements = require('../controllers/signalement.controller.js')
    const url = '/api/v1/signalements'

    app.post(url, signalements.create)
    app.get(url, signalements.findAll)
    app.get(`${url}/:id`, signalements.findOne)
    app.put(`${url}/:id`, signalements.update)
    app.delete(`${url}/:id`, signalements.delete)
}