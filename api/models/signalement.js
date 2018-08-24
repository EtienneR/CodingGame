const mongoose = require('mongoose')
const db = require('../config/db')

const signalementSchema = new mongoose.Schema({
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
        type: Array
    },
    statut: {
        type: String,
        default: 'Signalé'
    }
})

const Signalement = mongoose.model('signalements', signalementSchema)

/* Ajouter un utilisateur */
function saveOne(data) {
    const newSignalement = new Signalement(data)
    db.connect()
    return newSignalement.save(function(err) {
        if (err) throw err
        db.disconnect()
    })
}

/* Tous les signalements */
function findAll() {
    db.connect()
    return Signalement.find({}, function(err, signalements) {
        if (err) throw err
        db.disconnect()
    })
}

/* Un signalement via son id */
function findById(id, data) {
    db.connect()
    return Signalement.findByIdAndUpdate(id, data, function(err, signalement) {
        if (err) throw err
        db.disconnect()
    })
}

/* Modifier un signalement via son id */
function updateById(id, data) {
    db.connect()
    return Signalement.findByIdAndUpdate(id, data, function(err, signalement) {
        if (err) throw err
        db.disconnect()
    })
}

module.exports = {
    saveOne,
    findAll,
    findById,
    updateById
}
