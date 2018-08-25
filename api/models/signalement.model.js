const mongoose = require('mongoose')

const signalementSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    creneauDebut: {
        type: String
    },
    creneauFin: {
        type: String
    },
    alerteur: {
        type: String
    },
    animal: {
        type: String
    },
    couleur: {
        type: String
    },
    voie: {
        type: String
    },
    cp: {
        type: Number
    },
    ville: {
        type: String
    },
    etat: {
        type: String
    },
    collier: {
        type: Boolean
    },
    coordonnees: {
        type: Map,
        of: String
    },
    statut: {
        type: String,
        default: 'Signalé'
    },
    brigade: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('signalements', signalementSchema);