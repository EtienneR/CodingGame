const Signalement = require('../models/signalement')

module.exports = (function() {
    const signalements = require('express').Router()

    // FAKE DATA
    const data = [
        {
            id: 1,
            date: new Date('27 Dec 2016'),
            creneauDebut: '10:00',
            creneauFin: '11:00',
            alerteur: 'garfield@lovesyou.com',
            animal: 'Chat',
            couleur: 'Noir',
            voie: '21 rue de Rivoli',
            cp: 75004,
            ville: 'Paris',
            etat: 'Très faible',
            collier: false,
            statut: 'Signalé',
            brigade: '',
            coordonnees: ["48.8560303", "2.3572309"]
        },
        {
            id: 2,
            date: new Date('27 Dec 2016 GMT'),
            creneauDebut: '14:00',
            creneauFin: '15:00',
            alerteur: 'scooby@doo.com',
            animal: 'Chien',
            couleur: 'Boxer',
            voie: '24 rue de Chazelles',
            cp: 75004,
            ville: 'Paris',
            etat: 'Bon',
            collier: true,
            statut: 'Assigné',
            brigade: '75015-A',
            coordonnees: ["48.8806099", "2.305925"]
        },
        {
            id: 3,
            date: new Date('23 Dec 2016 GMT'),
            creneauDebut: '18:00',
            creneauFin: '19:00',
            alerteur: 'felix@lechat.com',
            animal: 'Chat',
            couleur: 'Roux',
            voie: '5 rue Charles Marie',
            cp: 75016,
            ville: 'Paris',
            etat: 'Faible',
            collier: false,
            statut: 'Signalé',
            brigade: '',
            coordonnees: ["48.8407776", "2.263311"]
        },
        {
            id: 4,
            date: new Date('25 Dec 2016 GMT'),
            creneauDebut: '20:00',
            creneauFin: '21:00',
            alerteur: 'philou@leperroquet.fr',
            animal: 'Perroquet',
            couleur: 'Mixte',
            voie: '5 rue Gutenberg',
            cp: 92100,
            ville: 'Boulogne - Billancourt',
            etat: 'Bon',
            collier: false,
            statut: 'Signalé',
            brigade: '',
            coordonnees: ["48.8455839", "2.2447973"]
        }
    ]

    // Ajouter un signalement - POST - /api/v1/signalement
    signalements.post('/', function (req, res) {
        const { creneauDebut, creneauFin, alerteur, animal, couleur, voie, cp, ville, etat, collier, coordonnees } = req.body
        Signalement.saveOne(req.body).exec(function(err) {
            if (err) throw err
        })
    })

    // Tous les signalements - GET - /api/v1/signalement
    signalements.get('/', function (req, res) {
        //res.json(data)
        Signalement.findAll().exec(function(err, signalements) {
            if (err) throw err
            res.json(signalements)
        })
    })

    // 1 signalement via son _id - GET - /api/v1/signalement/:_id
    signalements.get('/:id', function (req, res) {
        const id = req.params.id
        Signalement.findById(id).exec(function(err, signalement) {
            if (err) throw err
            res.json(signalement)
        })
        // const f = data.find(d => d.id == id)
        // res.json(f)
    })

    // Modifier 1 signalement via son _id - PUT - /api/v1/signalement/:_id
    signalements.put('/:id', function (req, res) {
        const id = req.params.id
        const { creneauDebut, creneauFin, alerteur, animal, couleur, voie, cp, ville, etat, collier, coordonnees } = req.body
        Signalement.updateById(id, req.body).exec(function(err, signalement) {
            if (err) throw err
            res.json(signalement)
        })
        // const f = data.find(d => d.id == id)
        // res.json(f)
    })

    return signalements
})()
