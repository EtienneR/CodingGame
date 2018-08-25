module.exports = (app) => {
    const signalements = require('../controllers/signalement.controller.js')
    const url = '/api/v1/signalements'

    // Create a new Note
    app.post(url, signalements.create)

    // Retrieve all Notes
    app.get(url, signalements.findAll)

    // Retrieve a single Note with noteId
    app.get(`${url}/:id`, signalements.findOne)

    // Update a Note with noteId
    app.put(`${url}/:id`, signalements.update)
    app.put(`${url}/:id/brigade`, signalements.updateBrigade)

    // Delete a Note with noteId
    app.delete(`${url}/:id`, signalements.delete)
}