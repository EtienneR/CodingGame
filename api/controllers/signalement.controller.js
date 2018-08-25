const Signalement = require('../models/signalement.model.js');

// Enregistrer un nouveau signalement
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Signalement content can not be empty"
        })
    }

    const signalement = new Signalement(req.body)

    signalement.save()
    .then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        })
    })
}

// Afficher tous les signalements
exports.findAll = (req, res) => {
    Signalement.find()
    .then(signalements => {
        console.log('signalements', signalements)
        res.json(signalements)
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving signalement."
        })
    })
}

// Afficher un signalement
exports.findOne = (req, res) => {
    Signalement.findById(req.params.id)
    .then(signalement => {
        if (!signalement) {
            return res.status(404).json({
                message: "Signalement not found with id " + req.params.id
            })
        }
        res.json(signalement);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Signalement not found with id " + req.params.id
            })                
        }
        return res.status(500).json({
            message: "Error retrieving signalement with id " + req.params.id
        })
    })
}

// Modifier un signalement
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Signalement content can not be empty"
        })
    }

    Signalement.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(signalement => {
        if(!signalement) {
            return res.status(404).json({
                message: "Signalement not found with id " + req.params.id
            })
        }
        res.json(signalement)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Signalement not found with id " + req.params.id
            })
        }
        return res.status(500).json({
            message: "Error updating signalement with id " + req.params.id
        })
    })
}

exports.updateBrigade = (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Signalement content can not be empty"
        })
    }

    Signalement.findByIdAndUpdate(req.params.id, { brigade: req.body.brigade }, { new: true })
    .then(signalement => {
        if(!signalement) {
            return res.status(404).json({
                message: "Signalement not found with id " + req.params.id
            })
        }
        res.json(signalement)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Signalement not found with id " + req.params.id
            })
        }
        return res.status(500).json({
            message: "Error updating signalement with id " + req.params.id
        })
    })
}

// Supprimer un signalement
exports.delete = (req, res) => {
    Signalement.findByIdAndRemove(req.params.id)
    .then(signalement => {
        if (!signalement) {
            return res.status(404).json({
                message: "Signalement not found with id " + req.params.id
            })
        }
        res.json({message: "Signalement deleted successfully!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "Signalement not found with id " + req.params.id
            })
        }
        return res.status(500).json({
            message: "Could not delete signalement with id " + req.params.id
        })
    })
}
